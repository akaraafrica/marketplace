import { NextApiRequest, NextApiResponse } from "next";
import { ItemType, TriggerAction } from "../../../services/action.service";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.body);
    try {
      const createPurchase = prisma.purchase.create({
        data: {
          amount: Number(req.body.amount),
          userId: req.body.userId,
          transactionId: req.body.transactionId,
          itemId: req.body.itemId,
        },
      });
      const updateItemOwner = prisma.item.update({
        where: {
          id: req.body.itemId,
        },

        data: {
          ownerId: req.body.userId,
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
      } catch (error) {
        console.log(error);
      }

      await TriggerAction({
        action: "purchase",
        receivers: [req.body.ownerId],
        actor: req.body.userId,
        content: "purchase",
        title: req.body.notificationTitle,
        itemTypes: [ItemType.Item],
        itemIds: [req.body.itemId],
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
