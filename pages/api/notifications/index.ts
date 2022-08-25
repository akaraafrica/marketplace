import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";
import verifyToken from "../../../utils/middlewares/verifyToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const user = await prisma.user.findFirst({
      where: {
        walletAddress: req.body.address,
      },
      include: {
        receivedNotifications: true,
      },
    });

    res.status(200).json({ data: user?.receivedNotifications });
  }
  if (req.method === "POST") {
    // const receiverId = parseInt(req.body.userId);
    // await prisma.notification.create({
    //   data: {
    //     title: req.body.title,
    //     content: req.body.content,
    //     read: false,
    //     receiverId: receiverId,
    //     action: req.body.action,
    //   },
    // });
    // res.status(201).json({ message: "Notifications created" });
  }
  res.status(405).send({ message: "Only POST requests allowed" });
};

export default verifyToken(handler);
