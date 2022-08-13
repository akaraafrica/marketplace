import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log(req.body);

      const data = await prisma.bid.create({
        data: {
          amount: Number(req.body.amount),
          bidderId: req.body.bidderId,
          itemId: req.body.itemId,
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
