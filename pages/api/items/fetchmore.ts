import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const lastIndex = req.query.lastIndex;
    const priceRange = req.query.priceRange;
    const priceOrder = req.query.priceOrder as "asc" | "desc";
    const createdOrder = req.query.createdOrder as "asc" | "desc";
    const likesOrder = req.query.likesOrder as "asc" | "desc";

    try {
      const items = await prisma.item.findMany({
        where: {
          price: {
            gt: Number(priceRange) || 0,
          },
        },
        skip: Number(lastIndex),
        take: 50,
        orderBy: [
          {
            price: priceOrder || "asc",
          },
          {
            createdAt: createdOrder || "asc",
          },
          {
            likes: {
              _count: likesOrder || "asc",
            },
          },
        ],
      });
      return res.status(200).json(items);
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
