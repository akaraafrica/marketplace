import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    try {
      const { collection, id } = req.body;
      await prisma.collection.update({
        where: {
          id: collection,
        },
        data: {
          items: {
            connect: {
              id: id,
            },
          },
        },
      });
      console.log("item added");

      res.status(200).json("item added");
    } catch (error) {
      console.log(error);
      res.status(500).json("error adding item");
    }
  }
  res.status(402);
};

export default handler;
