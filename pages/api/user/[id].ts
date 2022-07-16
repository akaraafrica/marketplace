import { NextApiRequest, NextApiResponse } from "next";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";
import prisma, { Prisma } from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string);
  switch (req.method) {
    case "GET":
      try {
        const users = await prisma.user.findFirst({
          where: {
            id: id,
          },
          include: {
            profile: true,
            collections: true,
            items: true,
          },
        });
        return res.status(200).json(users);
      } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(500).send(ParsePrismaError(error));
        }
        return res.status(400).json(error);
      }
      break;
    default:
      res.send("Method not allowed");
      break;
  }
};
export default handler;
