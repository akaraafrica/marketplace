import { NextApiRequest, NextApiResponse } from "next";
import { IItem } from "../../../types/item.interface";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;
  console.log(data.items.length);

  if (req.method === "PATCH") {
    try {
      await prisma.collection.update({
        where: {
          id: data.id,
        },
        data: {
          draftItems: {
            deleteMany: {},
          },
          contributors: {
            deleteMany: {},
          },
        },
      });
      await prisma.collection.update({
        where: {
          id: data.id,
        },
        data: {
          status: "DRAFT",
          description: data.description,
          visible: data.visible,
          updatedAt: new Date(),
          worth: data.worth,

          draftItems: {
            create: data.items.map((item: IItem) => ({
              itemId: item.id,
              title: item.title,
              description: item.description,
              price: item.price,
              ownerId: item.ownerId,
              video: item.video,
              images: item.images,
            })),
          },
          contributors: {
            create: data.owners.map((user: { id: number }) => ({
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
  if (req.method === "POST") {
    try {
      await prisma.collection.update({
        where: {
          id: data.id,
        },
        data: {
          lunchTime: data.date,
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
