import prisma, { Prisma } from "../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  if (req.method != "POST") return res.end("Method not allowed");

  if (!email)
    return res
      .status(400)
      .json({ message: "Please provide email address to login" });
  if (!password)
    return res
      .status(400)
      .json({ message: "Please provide password to login" });

  try {
    const myUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (!myUser)
      return res.status(400).json({
        message: "You have not been signed up. Please signup to login",
      });

    const secret: string = process.env.JWT_KEY!;

    if (email) {
      const compare = await bcrypt.compare(
        password,
        myUser ? myUser.password : ""
      );
      const address = myUser.walletAddress;
      if (compare) {
        const token = jwt.sign({ address }, secret, { expiresIn: "2d" });
        res
          .status(200)
          .json({ message: "Logged In", accessToken: token, user: myUser });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid email or password, try again" });
      }
    }
  } catch (error: any) {
    console.log("error here ", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).send(ParsePrismaError(error));
    }
    return res.status(500).json({
      message: error.message,
    });
  }
}
