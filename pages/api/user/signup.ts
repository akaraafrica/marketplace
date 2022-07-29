import prisma, { Prisma } from "../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Sendmail from "../../../utils/sendgrid/sendmail";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";

interface DT {
  email: string;
  password: string;
}

export default async function Signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password, address } = req.body;
  const userEmail = await req.body.email;

  let link = "";
  // console.log('Welcome:', userEmail )
  switch (req.method) {
    case "POST":
      try {
        const oldUser = await prisma.user.findFirst({
          where: {
            email: userEmail,
          },
        });

        if (!userEmail && !password && !address)
          return res.status(400).json({
            message: "You need your email, password and address to sign up",
          });
        if (!userEmail)
          return res.status(400).json({
            message: "Please provide email address to sign up",
          });
        if (!password)
          return res
            .status(400)
            .json({ message: "Please provide password to sign up" });

        if (oldUser) {
          return res.status(409).json({
            message:
              "User already exist, please login or click on forgot password to reset your password",
          });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        // console.log("User email:", userEmail);

        const secret: string = process.env.JWT_KEY!;

        const newUser = await prisma.user.create({
          data: {
            email: userEmail,
            password: encryptedPassword,
            walletAddress: address,
            notifications: {},
            updatedAt: new Date(),
          },
        });

        const token = jwt.sign({ user: address }, secret, {
          expiresIn: "2d",
        });
        link = `${process.env.NEXT_PUBLIC_DOMAIN}api/user/activate/${userEmail}/${token}`;
        // console.log("Secret:", token);

        const Emaildata = {
          to: userEmail,
          from: "info@mbizi.org",
          templateId: "d-1fbec631dc1248fc9b79e51299b0917f",
          name: userEmail,
          email: userEmail,
          link: link,
          subject: "👋 Please confirm your email",
        };

        Sendmail(Emaildata);
        res.status(200).json({
          user: newUser,
          token,
          message: "Please check your email to confirm",
        });
      } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(500).send(ParsePrismaError(error));
        }
        return res.json({
          message: error.message,
        });
      }
      break;

    case "DELETE":
      try {
        if (userEmail) {
          await prisma.user.delete({
            where: {
              email: userEmail,
            },
          });
        }
        res.send("User deleted succesfuly");
      } catch (error) {
        res.status(500).send(error);
      }
      break;

    case "GET":
      try {
        const allusers = await prisma.user.findMany();
        res.send(allusers);
      } catch (error) {
        res.status(500).send(error);
      }
      break;

    default:
      res.send("Method not allowed");
      break;
  }
}
