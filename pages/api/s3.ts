import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const region = "eu-west-3";
  const bucketName = "ak-marketplace";
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_KEY;

  try {
    const s3 = new AWS.S3({
      region,
      accessKeyId,
      secretAccessKey,
      signatureVersion: "v4",
    });

    const params = {
      Bucket: bucketName,
      Key: req.body.key,
      Expires: 120,
    };

    const url = await s3.getSignedUrlPromise("putObject", params);
    console.log(url);

    res.status(200).send(url);
  } catch (error) {
    res.status(400).end();
  }
}
