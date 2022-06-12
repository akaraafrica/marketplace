import prisma from "../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";

export default async function PasswordReset(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.update({
      where: {
        email: req.body.email,
      },
      data: {
        password: hashedPassword,
      },
    });
    res.json({
      message: "Updated",
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).send(ParsePrismaError(error));
    }
    return res.send(error);
  }
}
