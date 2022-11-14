import prisma, { Prisma } from "../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Sendmail from "../../../utils/sendgrid/sendmail";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";
import excludePassword from "../../../utils/helpers/excludePassword";

interface DT {
  email: string;
  password: string;
}

export default async function Signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password, address, name, dob, gender, avatar, phoneNumber, bio } =
    req.body;
  const userEmail = await req.body.email;
  let link = "";
  console.log({
    password,
    address,
    name,
    dob,
    gender,
    avatar,
    phoneNumber,
    bio,
  });
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
            receivedNotifications: {},
            updatedAt: new Date(),
            profile: {
              create: {
                name: name,
                dob: new Date(dob),
                avatar: avatar,
                phoneNumber: phoneNumber,
                bio: bio,
                gender: gender,
              },
            },
          },
        });
        console.log(newUser);
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
        const newUserWithoutPassword = excludePassword(newUser);
        console.log("user created");
        res.status(200).json({
          user: newUserWithoutPassword,
          token,
          message: "Please check your email to confirm",
        });
      } catch (error: any) {
        console.log(error);

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
        const allusers = await prisma.user.findMany({
          include: {
            profile: true,
            items: true,
          },
        });
        const allusersWithoutPassword = excludePassword(allusers);
        res.json(allusersWithoutPassword);
      } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(500).send(ParsePrismaError(error));
        }
        return res.json({
          message: error.message,
        });
      }
      break;
    case "PUT":
      try {
        await prisma.user.update({
          where: {
            id: req.body.id,
          },
          data: {
            profile: {
              update: {
                avatar: avatar,
              },
            },
          },
        });
      } catch (error) {}
    default:
      res.send("Method not allowed");
      break;
  }
}
