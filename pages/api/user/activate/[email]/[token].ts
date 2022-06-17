import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ParsePrismaError } from "../../../../../utils/helpers/prisma.error";

interface DT {
  email: string;
  password: string;
}

const prisma = new PrismaClient();

export default async function Emailverification(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userEmail = req.body.email;
  if (userEmail) {
    try {
      await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          verified: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).send(ParsePrismaError(error));
      }
      console.log(error);
    }
  }
  res.redirect("/success");
}
