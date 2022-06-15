import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";
import verifyToken from "../../../utils/middlewares/verifyToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;
  if (req.method === "PUT") {
    await prisma.notification.updateMany({
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
    await prisma.notification.deleteMany({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Deleted successfully" });
  }
};

export default verifyToken(handler);
