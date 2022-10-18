import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await prisma.collection.update({
        where: {
          id: req.body.id,
        },
        data: {
          status: req.body.status,
        },
      });
      console.log("Collection updated");
      res.status(201).json({ message: "Collection updated" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }
};
