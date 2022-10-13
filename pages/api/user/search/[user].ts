import type { NextApiRequest, NextApiResponse } from "next";
import excludePassword from "../../../../utils/helpers/excludePassword";
import prisma from "../../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.query.user as string;
  if (req.method === "GET") {
    try {
      const searchedUsers = await prisma.user.findMany({
        take: 5,
        where: {
          OR: [
            {
              email: {
                contains: user,
              },
            },
            {
              walletAddress: {
                contains: user,
              },
            },
            {
              profile: {
                name: {
                  contains: user,
                },
              },
            },
          ],
        },
        include: {
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
