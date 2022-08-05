import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      if (req.body.likedId) {
        const data = await prisma.like.delete({
          where: {
            id: req.body.likedId,
          },
        });
        res.status(200).json(data);

        console.log(data);
      } else {
        const data = await prisma.like.create({
          data: {
            itemId: req.body.itemId,
            collectionId: req.body.collectionId,
            userId: req.body.userId,
          },
        });
        res.status(200).json(data);

        console.log(data);
      }
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }
}
