import prisma, { Prisma } from "../../../utils/lib/prisma";
import { destroyCookie, parseCookies } from "nookies";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";

export default async function me(req: NextApiRequest, res: NextApiResponse) {

  try {
    console.log("this is me here ===>>>>", req)
    return res.status(200).json("user data here ")
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).send(ParsePrismaError(error));
    }
    return res.json({
      message: error.message,
    });
  }
}
