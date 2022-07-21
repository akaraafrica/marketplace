import prisma, { Prisma } from "../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";

export default async function Fetch(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const address = req.query.address as string;
    if (!address) return res.status(404);
    try {
      const user = await prisma.user.findFirst({
        where: {
          walletAddress: address,
        },
        include: {
          profile: true,
          collections: true,
          items: true,
          followers: true,
          following: true,
        },
      });
      console.log(user);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).send(ParsePrismaError(error));
      }
      return res.status(400).json(error);
    }
  }
}
