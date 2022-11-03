import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      if (req.body.status === "VERIFIED") {
        await prisma.collection.update({
          where: {
            id: req.body.id,
          },
          data: {
            status: req.body.status,
            items: {
              connect: req.body.collection.draftItems.map(
                (item: { id: number }) => ({
                  id: item.id,
                })
              ),
            },
            draftItems: {
              set: [],
            },
          },
        });

        console.log("Collection updated");
        res.status(201).json({ message: "Collection updated" });
      }
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
export default handler;
