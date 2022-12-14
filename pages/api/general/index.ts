import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const text = req.body.text;
    try {
      const data = await prisma.$transaction([
        prisma.user.findMany({
          take: 5,
          where: {
            OR: [
              {
                username: {
                  contains: text,
                  mode: "insensitive",
                },
                email: {
                  contains: text,
                  mode: "insensitive",
                },
                profile: {
                  name: {
                    contains: text,
                    mode: "insensitive",
                  },
                },
              },
            ],
          },
          select: {
            id: true,
            profile: true,
            email: true,
            username: true,
            walletAddress: true,
          },
        }),
        prisma.collection.findMany({
          take: 5,
          where: {
            status: "PUBLISHED",
            title: {
              contains: text,
              mode: "insensitive",
            },
          },
          select: {
            id: true,
            images: true,
            title: true,
          },
        }),
        prisma.item.findMany({
          take: 5,
          where: {
            published: true,
            title: {
              contains: text,
              mode: "insensitive",
            },
          },
          select: {
            id: true,
            images: true,
            title: true,
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
