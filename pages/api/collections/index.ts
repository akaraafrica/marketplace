import { NextApiRequest, NextApiResponse } from "next";
import {
  Actions,
  ItemType,
  TriggerAction,
} from "../../../services/action.service";
import { IItem } from "../../../types/item.interface";
import { randStr } from "../../../utils/helpers/randomStr";
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
  if (req.method === "POST") {
    const { data, user } = req.body;
    let status =
      data.type === "ORDINARY" || data.type === "LOCKSHARED"
        ? "READY"
        : ("DRAFT" as any);

    try {
      const response = await prisma.collection.create({
        data: {
          title: data.title,
          description: data.description,
          tokenId: randStr(10),
          images: data.image,
          visible: data.visible,
          type: data.type,
          videos: data.videos,
          status: status,
          updatedAt: new Date(),
          author: {
            connect: {
              id: user.id,
            },
          },
          draftItems: {
            create: data?.items.map((item: IItem) => ({
              id: item.id,
              title: item.title,
              description: item.description,
              price: item.price,
              ownerId: item.ownerId,
              video: item.video,
              images: item.images,
            })),
          },
          contributors: {
            create: data?.owners.map((user: { id: number }) => ({
              user: {
                connect: {
                  id: user.id,
                },
              },
            })),
          },
        },
      });

      console.log("Collection created");

      res.status(201).json({ id: response.id, message: "Collection created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
  if (req.method === "PATCH") {
    try {
      await prisma.collection.update({
        where: {
          id: req.body.id,
        },
        data: {
          images: req.body.images,
          videos: req.body.videos,
        },
      });
      res.status(201).json({ message: "Collection images updated" });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
};
export default handler;
