import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";
import verifyToken from "../../../utils/middlewares/verifyToken";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  auth?: { user: string }
) => {
  const id: number = Number(req.query.id);
  if (req.method === "GET") {
    const data = await prisma.notification.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json({ data });
  }

  if (req.method === "PUT") {
    await prisma.notification.update({
      where: {
        id: id,
      },
      data: {
        status: true,
      },
    });
    res.status(200).json({ message: "Updated successfully" });
  }

  if (req.method === "DELETE") {
    const item = await prisma.notification.findFirst({
      where: {
        id: id,
      },
    });
    if (!item) {
      return res.status(404).json({
        error: new Error("Notification does not exist"),
      });
    }
    if (item.userId.toString() !== auth?.user) {
      return res.status(401).json({
        error: new Error("Requête non autorisée !"),
      });
    }
    await prisma.notification.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Deleted successfully" });
  }
};

export default verifyToken(handler);
