import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const lastIndex = req.query.lastIndex;
    const priceRange = req.query.priceRange;
    const priceOrder = req.query.priceOrder as "asc" | "desc";
    const createdOrder = req.query.createdOrder as "asc" | "desc";
    const likesOrder = req.query.likesOrder as "asc" | "desc";
    const verifiedCreator = req.query.verifiedCreator as unknown as string;
    const category = req.query.category as unknown as any;
    console.log("fetchmore");

    console.log({
      category,
      verifiedCreator,
      likesOrder,
      createdOrder,
      priceOrder,
      priceRange,
    });
    try {
      const items = await prisma.item.findMany({
        where: {
          price: {
            lte: Number(priceRange) || 0,
          },
          owner: {
            verified: verifiedCreator.toLowerCase() === "true",
          },
          category: category,
        },
        include: {
          likes: true,
        },
        skip: Number(lastIndex),
        take: 20,
        orderBy: [
          {
            price: priceOrder,
          },
          {
            createdAt: createdOrder,
          },
          {
            likes: {
              _count: likesOrder,
            },
          },
        ],
      });
      return res.status(200).json(items);
    } catch (error) {
      res.status(400).json("error");
      console.log(error);
    }
  }
};

export default handler;
