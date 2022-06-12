import prisma from "../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  if (req.method === "GET") return res.end("Method not allowed");

  if (!email && !req.body.password)
    return res.end("You need login details to login");
  if (!email) return res.end("Please provide email address to login");
  if (!req.body.password) return res.end("Please provide password to login");

  try {
    const myUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (!myUser)
      return res.end("You have not been signed up. Please signup to login");

    const secret = process.env.JWT_KEY;

    if (email) {
      const compare = await bcrypt.compare(
        password,
        myUser ? myUser.password : ""
      );
      if (compare) {
        const token = jwt.sign({ email }, secret || "", { expiresIn: "2d" });
        res.json({ message: "Logged In", accessToken: token });
      } else {
        return res.send("Invalid password, try again");
      }
    }
  } catch (error) {
    return res.status(500).end(` ${error} `);
  }
}
