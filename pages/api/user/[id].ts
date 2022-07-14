import { NextApiRequest, NextApiResponse } from "next";
import prisma, { Prisma } from "../../../utils/lib/prisma";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as unknown as number;
  switch (req.method) {
    case "GET":
      try {
        prisma.user.findUnique({
          where: {
            id: id,
          },
          include: {
            profile: true,
          },
        });
      } catch (error) {}
      break;
    default:
      res.send("Method not allowed");
      break;
  }
};
export default handler;
