import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: number = parseInt(req.query.id as string);
  if (req.method === "GET") {
    const data = await prisma.collection.findMany({
      where: {
        authorId: id,
      },
      select: {
        id: true,
        title: true,
      },
    });

    res.status(200).json({ data });
  }
};

export default handler;
