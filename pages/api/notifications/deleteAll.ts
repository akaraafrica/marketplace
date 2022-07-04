import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";
import verifyToken from "../../../utils/middlewares/verifyToken";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  auth?: { user: string }
) => {
  const id: string = req.query.id as string;

  if (req.method === "DELETE") {
    await prisma.user.update({
      where: {
        walletAddress: auth?.user || '',
      },
      data: {
        notifications: {
          deleteMany: {},
        },
      },
    });
    res.status(200).json({ message: "Deleted all notifications successfully" });
  }
};

export default verifyToken(handler);
