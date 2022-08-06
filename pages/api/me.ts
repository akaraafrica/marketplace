import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/lib/prisma";
import verifyToken from "../../utils/middlewares/verifyToken";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  auth?: string
) => {
  console.log("auth here is ", auth);
  if (!auth) return res.status(401).send("unauthorized");
  if (req.method === "GET") {
    try {
      const user = await prisma.user.findFirst({
        where: {
          walletAddress: auth,
        },
      });
      if (!user) return res.status(404).send("user not found");
      return res.status(200).json(user);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export default verifyToken(handler);
