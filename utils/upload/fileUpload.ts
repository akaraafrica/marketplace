import AWS from "aws-sdk";
import { getCookie } from "cookies-next";

const S3_BUCKET = "ak-marketplace";
const REGION = "eu-west-3";
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const getFileUploadURL = async (file: any, fileName: string) => {
  try {
    const address = getCookie("address") as string;
    const Key = address?.slice(1, 6) + "/" + fileName;
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key,
    };

    await myBucket
      .putObject(params)
      .promise()
      .then(() => {
        console.log("Successfully uploaded file");
      })
      .catch(() => {
        console.log("Failed to upload file");
      });
    const url = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${Key}`;
    return url;
  } catch (error) {
    console.log(error);
  }
};
