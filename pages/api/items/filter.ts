import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const priceRange = req.query.priceRange;
    const priceOrder = req.query.priceOrder as "asc" | "desc";
    const createdOrder = req.query.createdOrder as "asc" | "desc";
    const likesOrder = req.query.likesOrder as "asc" | "desc";
    const verifiedCreator = req.query.verifiedCreator as unknown as string;
    const category = req.query.category as unknown as any;
    console.log({
      category,
      verifiedCreator,
      likesOrder,
      createdOrder,
      priceOrder,
      priceRange,
    });
    if (category === "ALL") {
      try {
        const items = await prisma.item.findMany({
          take: 20,
          include: {
            likes: true,
          },
          where: {
            price: {
              lte: Number(priceRange),
            },
            owner: {
              verified: verifiedCreator.toLowerCase() === "true",
            },
          },
          orderBy: [
            {
              createdAt: createdOrder,
            },
            {
              price: priceOrder,
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
        res.status(400).json("error");
        console.log(error);
      }
    } else {
      try {
        const items = await prisma.item.findMany({
          take: 20,
          include: {
            likes: true,
          },
          where: {
            price: {
              lte: Number(priceRange) || 0,
            },
            owner: {
              verified: verifiedCreator.toLowerCase() === "true",
            },
            category: category,
          },
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
        res.status(400).json("error");
        console.log(error);
      }
    }
  }
};

export default handler;
