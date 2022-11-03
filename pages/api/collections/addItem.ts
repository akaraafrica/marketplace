import { NextApiRequest, NextApiResponse } from "next";
import { Actions, TriggerAction } from "../../../services/action.service";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    try {
      const { collection, user, item } = req.body;

      await prisma.collection.update({
        where: {
          id: collection.id,
        },
        data: {
          items: {
            // create: {
            // id: item.id,
            // },
          },
        },
      });
      await TriggerAction({
        action: Actions.AddItem,
        user,
        collection,
        item,
      });
      console.log("item added");

      res.status(200).json("item added");
    } catch (error) {
      console.log(error);
      res.status(500).json("error adding item");
    }
  }
  res.status(402);
};

export default handler;
