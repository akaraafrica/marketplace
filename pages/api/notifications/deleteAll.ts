import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";
import verifyToken from "../../../utils/middlewares/verifyToken";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  auth?: string
) => {
  if (!auth) return res.status(404).send("user not found");

  // if (req.method === "DELETE") {
  //   await prisma.user.update({
  //     where: {
  //       walletAddress: auth,
  //     },
  //     data: {
  //       notifications: {
  //         deleteMany: {},
  //       },
  //     },
  //   });
  //   return res
  //     .status(200)
  //     .json({ message: "Deleted all notifications successfully" });
  // }
  return res.status(403).send("invalid request");
};

export default verifyToken(handler);
