import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: "eu-central-1",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: "v4",
});

export const fileParams = {
  Bucket: process.env.BUCKET_NAME,
  Expires: 600,
  ACL: "public_read",
};

export default s3;
