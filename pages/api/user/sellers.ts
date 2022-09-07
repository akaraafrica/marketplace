import type { NextApiRequest, NextApiResponse } from "next";
import exclude from "../../../utils/helpers/excludePassword";
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

      // @ts-ignore: Unreachable code error
      const sellersWithoutPassword = exclude(sellers, "password");
      res.status(200).json({ sellersWithoutPassword });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
