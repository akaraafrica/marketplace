import { NextApiRequest, NextApiResponse } from "next";
import s3, { fileParams } from "../../../utils/lib/s3";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(400).send("invalid request");

  try {
    const { name, type } = req.body;
    const url = await s3.getSignedUrlPromise("putObject", {
      ...fileParams,
      Name: name,
      ContentType: type,
    });

    return res.status(200).json({ url });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
