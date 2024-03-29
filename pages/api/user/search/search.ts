import type { NextApiRequest, NextApiResponse } from "next";
import excludePassword from "../../../../utils/helpers/excludePassword";
import prisma from "../../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const searchedUsers = await prisma.user.findMany({
        include: {
          _count: {
            select: {
              items: true,
            },
          },
          profile: true,
        },
      });

      const sellersWithoutPassword = excludePassword(searchedUsers);
      res.status(200).json({ sellersWithoutPassword });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
