import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";
import verifyToken from "../../../utils/middlewares/verifyToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    await prisma.user.update({
      where: {
        walletAddress: req.body.walletAddress,
      },
      data: {
        receivedNotifications: {
          updateMany: {
            where: {
              read: false,
            },
            data: {
              read: true,
            },
          },
        },
      },
    });
    res.status(200).json({ message: "Updated all notifications successfully" });
  }
};

export default verifyToken(handler);
