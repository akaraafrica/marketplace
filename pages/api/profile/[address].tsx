import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";
import verifyToken from "../../../utils/middlewares/verifyToken";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  auth?: { user: string }
) => {
  const address = req.query.address as string;

  if (req.method === "PUT") {
    try {
      await prisma.profile.upsert({
        where: {
          userId: 7,
        },
        update: {
          name: req.body.name,
          bio: req.body.bio,
          dob: req.body.dob,
          avatar: req.body.avatar,
          phoneNumber: req.body.phoneNumber,
          user: req.body.user,
          // twitter: req.body.twitter,
          // facebook: req.body.facebook,
          // instagram: req.body.instagram,
          // itemMinOffer: req.body.itemMinOffer,
          // itemMaxOffer: req.body.itemMaxOffer
        },
        create: {
          userId: 7,
          name: req.body.name,
          bio: req.body.bio,
          dob: req.body.dob,
          avatar: req.body.avatar,
          phoneNumber: req.body.phoneNumber,
          user: req.body.user,
        },
      });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
