import type { NextApiRequest, NextApiResponse } from "next";
import excludePassword from "../../../../utils/helpers/excludePassword";
import prisma from "../../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userString = req.query.user as string;
  if (req.method === "GET") {
    try {
      const searchedUsers = await prisma.user.findMany({
        where: {
          OR: [
            {
              email: {
                contains: userString,
              },
            },
            {
              walletAddress: {
                contains: userString,
              },
            },
            {
              profile: {
                name: {
                  contains: userString,
                },
              },
            },
          ],
        },
        include: {
          items: true,
          profile: true,
        },
      });

      const searchedUsersWithoutPassword = excludePassword(searchedUsers);
      console.log();
      res.status(200).json({ searchedUsersWithoutPassword });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
