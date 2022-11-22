import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log(req.body.page);
    try {
      const data = await prisma.$transaction([
        prisma.item.count(),
        prisma.item.findMany({
          take: 8,
          where: {
            published: true,
          },
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
            likes: true,
          },
        }),
      ]);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
