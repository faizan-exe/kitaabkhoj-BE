import S3, { PutObjectLegalHoldOutput } from "aws-sdk/clients/s3";
require("dotenv").config()
const fs = require('fs')


const bucketName =process.env.AWS_BUCKET_NAME 
const access = process.env.AWS_ACCESS_KEY
const region = process.env.AWS_BUCKET_REGION;
const bucketSecret = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region: region,
  accessKeyId: access,
  secretAccessKey: bucketSecret
});

export const uploader = (file)=>{
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key:file.filename

  }

  return s3.upload(uploadParams).promise()
}

