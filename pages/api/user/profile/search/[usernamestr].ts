import type { NextApiRequest, NextApiResponse } from "next";
// import excludePassword from "../../../../../utils/helpers/excludePassword";
import prisma from "../../../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const usernamestr = req.query.usernamestr as string;
  if (req.method === "GET") {
    try {
      const searchedUsers = await prisma.user.findFirst({
        where: {
          username: usernamestr,
        },
        select: {
          username: true,
        },
      });
      console.log("user exist");
      res.status(200).json(searchedUsers);
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
