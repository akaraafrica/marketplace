import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";
import verifyToken from "../../../utils/middlewares/verifyToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const userNotifications = await prisma.notification.findMany({
      where: {
        userId: req.body.address,
      },
    });

    res.status(200).json({ data: userNotifications });
  }
  if (req.method === "POST") {
    await prisma.notification.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        status: false,
        userId: req.body.address,
      },
    });

    res.status(201).json({ message: "Notifications created" });
  }
  // res.status(405).send({ message: 'Only POST requests allowed' })
};

export default verifyToken(handler);
