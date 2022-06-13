import prisma from "../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Sendmail from "../../../utils/sendgrid/sendmail";
import { Prisma } from "@prisma/client";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";

export default async function ForgotPassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password } = req.body;
  const userEmail = req.body.email;

  try {
    const checkuser = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (checkuser) {
      const secret = process.env.JWT_KEY + checkuser.password;

      const payload = {
        email: checkuser.email,
        adress: checkuser.address,
      };
      const token = await jwt.sign(payload, secret, { expiresIn: "30m" });
      const link = `localhost:3000/auth/password-reset/${payload.email}/${token}`;

      const emailData = {
        to: userEmail,
        from: "info@mbizi.org",
        templateId: "d-1fbec631dc1248fc9b79e51299b0917f",
        dynamicTemplateData: {
          email: userEmail,
          resetLink: link,
        },
      };

      console.log(link);
      Sendmail(emailData);
      res.send("Password reset link has been sent to your email");
    } else {
      return res.send("No such user exist");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).send(ParsePrismaError(error));
    }
    return res.status(500).send(error);
  }
}
