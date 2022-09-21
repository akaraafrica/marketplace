import prisma, { Prisma } from "../../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { ParsePrismaError } from "../../../../utils/helpers/prisma.error";
import excludePassword from "../../../../utils/helpers/excludePassword";

export default async function Fetch(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const id = parseInt(req.query.id as string);

    if (!id) return res.status(404);
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
        include: {
          profile: true,
          items: true,
        },
      });
      const userWithoutPassword = excludePassword(user);
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).send(ParsePrismaError(error));
      }
      return res.status(400).json(error);
    }
  }
}
