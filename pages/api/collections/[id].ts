import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: number = parseInt(req.query.id as string);
  if (req.method === "GET") {
    const data = await prisma.collection.findFirst({
      where: {
        id: id,
      },
      include: {
        contributors: {
          include: {
            user: {
              include: {
                profile: true,
              },
            },
          },
        },
        author: {
          include: {
            profile: true,
          },
        },
        draftItems: true,
        items: {
          include: {
            bids: true,
            likes: true,
            ratings: true,
            owner: {
              include: {
                profile: true,
              },
            },
          },
        },
        beneficiaries: true,
        ratings: true,
      },
    });
    res.status(200).json({ data });
  }
};

export default handler;
