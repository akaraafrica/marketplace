import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const priceRange = req.query.priceRange;
    const priceOrder = req.query.priceOrder as "asc" | "desc";
    const createdOrder = req.query.createdOrder as "asc" | "desc";
    const likesOrder = req.query.likesOrder as "asc" | "desc";
    const creatorOrder = req.query.creatorOrder as unknown as string;
    const category = req.query.category as unknown as string;

    try {
      if (priceRange) {
        const items = await prisma.item.findMany({
          where: {
            price: {
              lte: Number(priceRange),
            },
          },
          take: 50,
        });
        return res.status(200).json(items);
      }
      if (creatorOrder) {
        const items = await prisma.item.findMany({
          take: 50,
          where: {
            owner: {
              verified: creatorOrder.toLowerCase() === "true",
            },
          },
        });
        return res.status(200).json(items);
      }
      if (priceOrder) {
        const items = await prisma.item.findMany({
          take: 50,
          orderBy: {
            price: priceOrder,
          },
        });

        return res.status(200).json(items);
      }
      if (createdOrder) {
        const items = await prisma.item.findMany({
          take: 50,
          orderBy: {
            createdAt: createdOrder,
          },
        });
        return res.status(200).json(items);
      }
      if (likesOrder) {
        const items = await prisma.item.findMany({
          take: 50,
          orderBy: {
            likes: {
              _count: likesOrder,
            },
          },
        });
        return res.status(200).json(items);
      }
      if (category === "ART") {
        const items = await prisma.item.findMany({
          where: {
            category: "ART",
          },
          take: 50,
        });
        return res.status(200).json(items);
      }
      if (category === "GAME") {
        const items = await prisma.item.findMany({
          where: {
            category: "GAME",
          },
          take: 50,
        });
        return res.status(200).json(items);
      }
      if (category === "MUSIC") {
        const items = await prisma.item.findMany({
          where: {
            category: "MUSIC",
          },
          take: 50,
        });
        return res.status(200).json(items);
      }
      if (category === "PHOTOGRAPHY") {
        const items = await prisma.item.findMany({
          where: {
            category: "PHOTOGRAPHY",
          },
          take: 50,
        });
        return res.status(200).json(items);
      }
      if (category === "VIDEO") {
        const items = await prisma.item.findMany({
          where: {
            category: "VIDEO",
          },
          take: 50,
        });
        return res.status(200).json(items);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json("error");
    }
  }
};

export default handler;
