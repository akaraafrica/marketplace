import prisma, { Prisma } from "../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Sendmail from "../../../utils/sendgrid/sendmail";
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
        adress: checkuser.walletAddress,
      };
      const token = await jwt.sign(payload, secret, { expiresIn: "30m" });
      const link = `${process.env.NEXT_BASE_URL}/password-reset/${payload.email}/${token}`;

      const emailData = {
        to: userEmail,
        from: "info@mbizi.org",
        templateId: "d-1fbec631dc1248fc9b79e51299b0917f",
        email: userEmail,
        link: link,
        subject: "Reset Password",
      };

      console.log(link);
      Sendmail(emailData);
      return res
        .status(200)
        .json({ message: "Password reset link has been sent to your email" });
    } else {
      return res.status(404).json({ message: "No such user exist" });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).send(ParsePrismaError(error));
    }
    return res.status(400).json(error);
  }
}
