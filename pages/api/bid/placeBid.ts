import { NextApiRequest, NextApiResponse } from "next";
import { Actions, TriggerAction } from "../../../services/action.service";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user, item, amount } = req.body;

    try {
      console.log(req.body);

      const data = await prisma.bid.create({
        data: {
          amount: amount,
          bidderId: user.id,
          itemId: item.id,
          updatedAt: new Date(),
        },
      });
      await TriggerAction({
        action: Actions.PlaceBid,
        user,
        item,
        bidAmount: amount,
      });

      res.status(200);

      res.status(200).json(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }
}
