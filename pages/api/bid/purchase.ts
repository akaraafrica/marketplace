import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log(req.body);

      const data = await prisma.purchase.create({
        data: {
          amount: Number(req.body.amount),
          purchaserId: req.body.purchaserId,
          transactionId: req.body.transactionId,
          itemId: req.body.itemId,
        },
      });
      await prisma.item.update({
        where: {
          id: req.body.itemId,
        },

        data: {
          ownerId: req.body.purchaserId,
          acceptedBid: 1,
          updatedAt: new Date(),
        },
      });

      res.status(200).json(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }
}
