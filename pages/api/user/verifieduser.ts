import { NextApiRequest, NextApiResponse } from "next";
import prisma, { Prisma } from "../../../utils/lib/prisma";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";
import exclude from "../../../utils/helpers/excludePassword";

export default async function VerifiedUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const vuser = await prisma.user.findMany({
      where: {
        verified: true,
      },
    });
    // @ts-ignore: Unreachable code error
    const vuserWithoutPassword = exclude(vuser, "password");
    res.status(200).send(vuserWithoutPassword);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).send(ParsePrismaError(error));
    }
    return res.status(209).send(error);
  }
}
