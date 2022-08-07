import { NextApiRequest, NextApiResponse } from "next";
import s3, { fileParams } from "../../../utils/lib/s3";
import { randStr } from "../../../utils/helpers/randomStr";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(400).send("invalid request");

  try {
    const { name, type } = req.body;
    const url = await s3.getSignedUrlPromise("putObject", {
      ...fileParams,
      Key: `${name}-${randStr(5)}`,
      ContentType: type,
    });
    return res.status(200).json(url);
  } catch (error) {
    res.end();
    console.log(error);
  }
};

export default handler;
