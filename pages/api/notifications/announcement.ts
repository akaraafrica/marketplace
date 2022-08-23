import { NextApiRequest, NextApiResponse } from "next";
import {
  Actions,
  ItemType,
  TriggerAction,
} from "../../../services/action.service";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = "" as any;
    TriggerAction({
      action: Actions.Announcement,
      content: "announcement content",
      title: "announcement",
      user,
    });
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.json({
      error: "There was an error",
    });
  }
}
