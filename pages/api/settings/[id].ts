import { NextApiRequest, NextApiResponse } from "next";
import excludePassword from "../../../utils/helpers/excludePassword";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";
import prisma, { Prisma } from "../../../utils/lib/prisma";
import verifyToken from "../../../utils/middlewares/verifyToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string);
  if (req.method === "GET") {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
        include: {
          profile: true,
        },
      });
      const userWithoutPassword = excludePassword(user);
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  if (req.method === "PATCH") {
    try {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          profile: {
            upsert: {
              create: {
                name: req.body.name,
                bio: req.body.bio,
                phoneNumber: req.body.phoneNumber,
                dob: req.body.dob,
                rating: req.body.rating,
                avatar: req.body.avatar,
                website: req.body.website,
                twitter: req.body.twitter,
                facebook: req.body.facebook,
                instagram: req.body.instagram,
              },
              update: {
                name: req.body.name,
                bio: req.body.bio,
                phoneNumber: req.body.phoneNumber,
                dob: req.body.dob,
                rating: req.body.rating,
                avatar: req.body.avatar,
                website: req.body.website,
                twitter: req.body.twitter,
                facebook: req.body.facebook,
                instagram: req.body.instagram,
              },
            },
          },
        },
      });

      return res.status(204).json("Updated successfully");
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.response });
    }
  }
};
export default verifyToken(handler);
