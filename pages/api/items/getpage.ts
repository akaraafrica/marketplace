import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // console.log(req.body.page);
    try {
      const page =
        Number(req?.query?.page) === 0 ? 0 : Number(req?.query?.page) - 1;
      const data = await prisma.$transaction([
        prisma.item.count({
          where: {
            published: true,
          },
        }),
        prisma.item.findMany({
          skip: page * 6 || 0,
          take: 6,
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
          orderBy: {
            id: "asc",
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
