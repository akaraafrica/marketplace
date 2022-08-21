import { NextApiRequest, NextApiResponse } from "next";
import { ItemType, TriggerAction } from "../../../services/action.service";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let users = await prisma.user.findMany({
      select: { id: true },
    });
    const receivers = users.map((user) => user.id);
    await TriggerAction({
      action: "announcement",
      receivers: receivers,
      actor: 5,
      content: "announcement content",
      title: "announcement",
    });
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.json({
      error: "There was an error",
    });
  }
}
