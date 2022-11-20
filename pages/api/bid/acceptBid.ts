import { NextApiRequest, NextApiResponse } from "next";
import { Actions, TriggerAction } from "../../../services/action.service";
import { randStr } from "../../../utils/helpers/randomStr";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user, item, bid } = req.body;

    try {
      const createPurchase = prisma.purchase.create({
        data: {
          amount: bid.amount,
          userId: user.id,
          transactionId: randStr(10),
          itemId: item.id,
          itemPrevOwnerId: item.ownerId,
          isAuction: true,
          inCollectionId: !!item?.inCollectionId,
        },
      });

      const updateItemOwner = prisma.item.update({
        where: {
          id: item.id,
        },
        data: {
          ownerId: bid.bidderId,
          acceptedBid: 1,
          updatedAt: new Date(),
        },
      });

      const deleteBids = prisma.bid.deleteMany({
        where: {
          itemId: item.id,
        },
      });
      const deleteAuction = prisma.auction.delete({
        where: {
          itemId: item.id,
        },
      });
      await prisma.$transaction([
        deleteBids,
        deleteAuction,
        updateItemOwner,
        createPurchase,
      ]);
      await TriggerAction({
        action: Actions.AcceptBid,
        user: bid.user,
        item,
        bidAmount: bid.amount,
      });
      res.status(200).json("successful");
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }
}
