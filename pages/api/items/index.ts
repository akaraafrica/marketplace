import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const items = await prisma.item.findMany();

    res.status(200).json({ data: items });
  }
};

export default handler;
