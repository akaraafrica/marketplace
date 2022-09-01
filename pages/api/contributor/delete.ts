import prisma, { Prisma } from "../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";

export default async function Fetch(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      await prisma.contributor.delete({
        where: {
          id: req.body.id,
        },
      });
      return res.status(200).send("contributor deleted");
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).send(ParsePrismaError(error));
      }
      return res.status(400).json(error);
    }
  }
}
