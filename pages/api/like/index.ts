import { NextApiRequest, NextApiResponse } from "next";
import { Actions, TriggerAction } from "../../../services/action.service";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user, item } = req.body;

    try {
      const itemData = await prisma.like.findFirst({
        where: {
          userId: user.id,
          itemId: item.id,
        },
      });
      if (itemData) {
        const data = await prisma.like.delete({
          where: {
            id: itemData.id,
          },
        });
        const notification = await prisma.notification.findFirst({
          where: {
            action: "like",
            senderId: user.id,
            itemId: item.id,
          },
        });
        await prisma.notification.delete({
          where: {
            id: notification?.id,
          },
        });
        res.status(200).json(data);
      } else {
        const data = await prisma.like.create({
          data: {
            itemId: item.id,
            collectionId: item.collection?.id,
            userId: user.id,
          },
        });

        await TriggerAction({
          action: Actions.Like,
          user,
          item,
        });
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }
}
