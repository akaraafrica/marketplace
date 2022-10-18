import prisma, { Prisma } from "../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";

export default async function Fetch(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id, percent } = req.body;
    console.log("id:", id);
    console.log("percent:", percent);
    if (!id) return res.status(404);
    try {
      // await prisma.collection.update({
      //   where: {
      //     id: id,
      //   },
      //   data: {
      //     status: 'READY'
      //   },
      // });
      await prisma.contributor.update({
        where: {
          id: id,
        },
        data: {
          percentage: percent,
        },
      });
      return res.status(200).send("contributor percentage updated");
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).send(ParsePrismaError(error));
      }
      return res.status(400).json(error);
    }
  }
}
