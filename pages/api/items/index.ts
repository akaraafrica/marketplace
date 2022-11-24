import { NextApiRequest, NextApiResponse } from "next";
import { Actions, TriggerAction } from "../../../services/action.service";
import { randStr } from "../../../utils/helpers/randomStr";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const items = await prisma.item.findMany({
        take: 8,
        where: {
          published: true,
        },
        include: {
          owner: {
            include: {
              profile: true,
            },
          },
          bids: {
            include: {
              user: true,
            },
          },
          likes: true,
        },
      });

      return res.status(200).json(items);
    } catch (error) {
      console.log(error);
    }
  }
  if (req.method === "POST") {
    try {
      const { item, user } = req.body;
      console.log({ item, user });
      const response = await prisma.item.create({
        data: {
          title: item.title,
          description: item.description,
          price: Number(item.price),
          ownerId: user.id,
          authorId: user.id,
          tokenId: randStr(10),
          published: false,
          category: item.category,
          royalties: Number(item.royalties),
          openForBid: false,
          video: "",
          images: [],
          updatedAt: new Date(),
        },
      });
      console.log("email action");

      await TriggerAction({
        action: Actions.CreateItem,
        user,
        item: response as any,
      });

      res.status(201).json({ id: response.id, message: "Item created" });
    } catch (error) {
      console.log(error);

      res.json({ error });
    }
  }
  if (req.method === "PATCH") {
    try {
      await prisma.item.update({
        where: {
          id: req.body.id,
        },
        data: {
          images: req.body.images,
        },
      });
      res.status(201).json({ message: "Item images updated" });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
};

export default handler;
