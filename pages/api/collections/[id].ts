import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  auth?: { user: string }
) => {
  const id: number = parseInt(req.query.id as string);
  if (req.method === "GET") {
    const data = await prisma.collection.findFirst({
      where: {
        id: id,
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        items: {
            include: {
                owner: {
                    include: {
                        profile: true,
                    },
                },
            },
        },
        ratings: true,
      },
    });
    res.status(200).json({ data });
  }
}

export default handler;