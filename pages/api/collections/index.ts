import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const data = await prisma.collection.findMany({
        include: {
          author: {
            include: {
              profile: true,
            },
          },
          items: true,
          ratings: true,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "POST") {
    try {
      const response = await prisma.collection.create({
        data: {
          title: req.body.title,
          description: req.body.description,
          tokenId: req.body.tokenId,
          images: req.body.image,
          type: {
            connect: {
              id: req.body.typeId,
            },
          },
          videos: req.body.videos,
          updatedAt: new Date(),
          author: {
            connect: {
              id: req.body.authorId,
            },
          },
        },
      });
      res.status(201).json({ id: response.id, message: "Collection created" });
    } catch (error) {
      console.log(error);

      res.json({ error });
    }
  }
  if (req.method === "PATCH") {
    try {
      await prisma.collection.update({
        where: {
          id: req.body.id,
        },
        data: {
          images: req.body.images,
          videos: req.body.videos,
        },
      });
      res.status(201).json({ message: "Collection images updated" });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
};
export default handler;
