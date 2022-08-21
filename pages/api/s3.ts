import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const region = "us-west-2";
  const bucketName = "ak-marketplace";
  // const accessKeyId = process.env.AWS_ACCESS_KEY
  const accessKeyId = "AKIA4TDMOMS3FBDFF25F";
  const secretAccessKey = "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";
  // const secretAccessKey = process.env.AWS_SECRET_KEY

  const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
  });

  const params = {
    Bucket: bucketName,
    Key: req.body.key,
    Expires: 60,
  };

  s3.createPresignedPost(
    {
      Fields: {
        Key: req.body.key,
      },
      Conditions: [
        ["starts-with", "$Content-Type", "image/"],
        ["content-length-range", 0, 10000001],
      ],
      Expires: 30,
      Bucket: bucketName,
    },
    (err, url) => {
      console.log(url);

      res.status(200).send(url);
    }
  );
  // const url = await s3.getSignedUrlPromise('putObject', params)
}
