import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const data = await prisma.collectionType.findMany({
        include: {
          collection: true,
        },
      });
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
