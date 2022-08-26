import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const sellers = await prisma.user.findMany({
        include: {
          _count: {
            select: {
              items: true,
            },
          },
          profile: true,
        },
      });

      res.status(200).json({ sellers });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
