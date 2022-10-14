import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const text: string = req.body.text;
    try {
      const items = await prisma.item.findMany({
        where: {
          OR: [
            {
              title: {
                contains: text,
                mode: "insensitive",
              },
            },
          ],
        },
      });
      return res.status(200).json(items);
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
