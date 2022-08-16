import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";
import verifyToken from "../../../utils/middlewares/verifyToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;
  if (req.method === "PUT") {
    await prisma.user.update({
      where: {
        walletAddress: req.body.address,
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
