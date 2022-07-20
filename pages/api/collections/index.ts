import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const data = await prisma.collection.findMany({
        include: {
          author: {
            include: {
              profile: true,
            },
          },
          items: true,
          ratings: true,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
