import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const items = await prisma.item.findMany({
        take: 10,
        include: {
          owner: {
            include: {
              profile: true,
            },
          },
          bids: {
            include: {
              user: true,
            },
          },
          ratings: {
            select: {
              rating: true,
            },
          },
          likes: true,
        },
      });
      return res.status(200).json(items);
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "POST") {
    try {
      await prisma.item.create({
        data: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          ownerId: req.body.ownerId,
          tokenId: req.body.tokenId,
          published: req.body.published,
          acceptedBid: req.body.acceptedBid,
          openForBid: req.body.openForBid,
          owner: req.body.owner,
          images: req.body.image,
          video: req.body.video,
          updatedAt: Date.now().toString(),
        },
      });
      res.status(201).json({ message: "Item created" });
    } catch (error) {
      res.json({ error });
    }
  }
};

export default handler;
