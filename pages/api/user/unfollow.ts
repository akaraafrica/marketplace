import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await prisma.follows.delete({
        where: {
          id: req.body.id,
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
