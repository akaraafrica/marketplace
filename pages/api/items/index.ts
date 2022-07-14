import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const id: string = req.query.id as string;
      const items = await prisma.item.findMany({
        take: 10,
        include: {
          owner: {
            include: {
              profile: true,
            },
          },
        },
      });
      return res.status(200).json(items);
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
