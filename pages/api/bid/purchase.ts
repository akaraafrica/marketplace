import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
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

      await prisma.$transaction([updateItemOwner, createPurchase]);
      res.status(200).json("successful");
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }
}