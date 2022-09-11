import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const item = req.body;

    try {
      await prisma.item.update({
        where: {
          id: req.body.id,
        },
        data: {
          description: item.description,
          price: Number(item.price),
          published: item.published,
        },
      });
      res.status(201).json({ message: "Item images updated" });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
  if (req.method === "POST") {
    console.log("update step");
    console.log(req.body);

    try {
      await prisma.item.update({
        where: {
          id: req.body.id,
        },
        data: {
          step: req.body.step,
        },
      });
      res.status(201).json({ message: "step updated" });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
};

export default handler;
