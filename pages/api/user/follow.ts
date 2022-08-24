import { NextApiRequest, NextApiResponse } from "next";
import { Actions, TriggerAction } from "../../../services/action.service";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { profile, user } = req.body;
    console.log({ profile }, { user });

    try {
      await TriggerAction({
        action: Actions.Follow,
        user,
        profile,
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
