import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const items = await prisma.item.findMany();
      return res.status(200).json(items);
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
