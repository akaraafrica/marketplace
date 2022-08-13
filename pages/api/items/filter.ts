import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const id = parseInt(req.query.id as string);
      const items = await prisma.item.aggregate({
        // where:{ id: id},
        _avg: {
          id: true,
        },
        orderBy: { createdAt: "desc" },
        // include: {
        //   owner: {
        //     select: {
        //       profile: true,
        //     },
        //   },
        //   bids: {
        //     include: {
        //       user: true,
        //     },
        //   },
        //   ratings: {
        //     select: {
        //       rating: true,
        //     },
        //    // as: 'rating'
        //   },
        //   likes: true,
        // },

        // take: 10,
      });

      return res.status(200).json(items);
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "POST") {
    try {
      const response = await prisma.item.create({
        data: {
          title: req.body.title,
          description: req.body.description,
          price: Number(req.body.price),
          ownerId: req.body.ownerId,
          tokenId: req.body.tokenId,
          published: req.body.published,
          acceptedBid: req.body.acceptedBid,
          openForBid: req.body.published,
          images: req.body.image,
          video: req.body.video,
          updatedAt: new Date(),
        },
      });
      res.status(201).json({ id: response.id, message: "Item created" });
    } catch (error) {
      console.log(error);

      res.json({ error });
    }
  }
  if (req.method === "PATCH") {
    try {
      await prisma.item.update({
        where: {
          id: req.body.id,
        },
        data: {
          images: req.body.images,
        },
      });
      res.status(201).json({ message: "Item images updated" });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
};

export default handler;