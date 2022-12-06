import { NextApiRequest, NextApiResponse } from "next";
import createQueue from "../../../utils/helpers/createQueue";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("req.body", req.body);
    res.status(200).json("data");
  } catch (error) {
    console.log("error", error);
  }
}
