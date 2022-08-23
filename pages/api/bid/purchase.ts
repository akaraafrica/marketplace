import { NextApiRequest, NextApiResponse } from "next";
import {
  Actions,
  ItemType,
  TriggerAction,
} from "../../../services/action.service";
import { randStr } from "../../../utils/helpers/randomStr";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user, item } = req.body;

    try {
      const createPurchase = prisma.purchase.create({
        data: {
          amount: item.price,
          userId: user.id,
          transactionId: randStr(10),
          itemId: item.id,
        },
      });
      const updateItemOwner = prisma.item.update({
        where: {
          id: item.id,
        },

        data: {
          ownerId: user.id,
          acceptedBid: 1,
          updatedAt: new Date(),
        },
      });
      const deleteBids = prisma.bid.deleteMany({
        where: {
          itemId: req.body.itemId,
        },
      });
      try {
        await prisma.$transaction([
          deleteBids,
          updateItemOwner,
          createPurchase,
        ]);
        await TriggerAction({
          action: Actions.Purchase,
          user,
          item,
        });
      } catch (error) {
        console.log(error);
      }
      res.status(200).json("successful");
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }
}
