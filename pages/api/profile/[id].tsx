import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";
import verifyToken from "../../../utils/middlewares/verifyToken";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  auth?: { user: string }
) => {
  const id = parseInt(req.query.id as string);

  if (req.method === "PUT") {
    try {
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          profile: {
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
              itemMaxOffer: req.body.itemMaxOffer,
              itemMinOffer: req.body.itemMinOffer,
              turnOnNotify: req.body.turnOnNotify,
            },
          },
        },
      });
      // console.log('body', req.body)
      return res.status(201).json({ message: "Updated successfully" });
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ message: error.response.data });
    }
  }
};
export default verifyToken(handler);
