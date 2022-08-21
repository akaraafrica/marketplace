import { NextApiRequest, NextApiResponse } from "next";
import { ItemType, TriggerAction } from "../../../services/action.service";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const item = await prisma.like.findFirst({
        where: {
          userId: req.body.userId,
          itemId: req.body.itemId,
        },
      });
      console.log(item);
      if (item) {
        const data = await prisma.like.delete({
          where: {
            id: item.id,
          },
        });
        const notification = await prisma.notification.findFirst({
          where: {
            action: "like",
            senderId: req.body.userId,
            itemId: req.body.itemId,
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
            itemId: req.body.itemId,
            collectionId: req.body.collectionId,
            userId: req.body.userId,
          },
        });

        await TriggerAction({
          action: "like",
          receivers: [req.body.ownerId],
          actor: req.body.userId,
          title: req.body.notificationTitle,
          itemTypes: [ItemType.Item],
          itemIds: [req.body.itemId],
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
