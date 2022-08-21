import { NextApiRequest, NextApiResponse } from "next";
import { ItemType, TriggerAction } from "../../../services/action.service";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await TriggerAction({
        action: "follow",
        receivers: [req.body.ownerId],
        actor: req.body.userId,
        title: req.body.notificationTitle,
      });
      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }
}
