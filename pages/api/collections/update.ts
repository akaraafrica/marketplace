import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;

  if (req.method === "PATCH") {
    try {
      await prisma.collection.update({
        where: {
          id: data.id,
        },
        data: {
          status: "DRAFT",
          description: data.description,
          visible: data.visible,
          updatedAt: new Date(),
          items: {
            connect: data.items.map((item: { id: number }) => ({
              id: item.id,
            })),
          },
          contributors: {
            set: data.owners.map((user: { id: number }) => ({
              user: {
                connect: {
                  id: user.id,
                },
              },
            })),
          },
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
