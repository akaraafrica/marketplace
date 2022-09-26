import { NextApiRequest, NextApiResponse } from "next";
import {
  Actions,
  ItemType,
  TriggerAction,
} from "../../../services/action.service";
import { randStr } from "../../../utils/helpers/randomStr";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { collection, user } = req.body;
    console.log({ collection }, { user });

    try {
      await TriggerAction({
        action: Actions.CreateCollection,
        user,
        collection,
      });
      console.log("collection request sent");

      res.status(201).json("collection request sent");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
};
export default handler;
