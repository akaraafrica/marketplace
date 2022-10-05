import prisma, { Prisma } from "../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";
import Items from "../../../components/dashboard/Items";

export default async function Fetch(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      await prisma.collection.update({
        where: {
          id: req.body.id,
        },
        data: {
          contributors: {
            delete: { id: req.body.contributorId },
          },
          items: {
            disconnect: req.body.items.map((item: { id: number }) => {
              id: item.id;
            }),
          },
        },
      });
      return res.status(200).send("contributor removed");
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).send(ParsePrismaError(error));
      }
      return res.status(400).json(error);
    }
  }
}
