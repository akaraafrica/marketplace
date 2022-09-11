import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.body);

    try {
      await prisma.user.update({
        where: {
          id: req.body.id,
        },
        data: {
          followedBy: {
            disconnect: {
              id: req.body.userId,
            },
          },
        },
      });
      console.log("user unfollowed");
      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }
}
