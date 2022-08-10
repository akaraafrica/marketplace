import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const item = await prisma.like.findFirst({
        where: {
          userId: req.body.userId,
          itemId: req.body.itemId,
        },
      });
      console.log(item);
      if (item) {
        const data = await prisma.like.delete({
          where: {
            id: item.id,
          },
        });
        res.status(200).json(data);
      } else {
        const data = await prisma.like.create({
          data: {
            itemId: req.body.itemId,
            collectionId: req.body.collectionId,
            userId: req.body.userId,
          },
        });
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }
}
