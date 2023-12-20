const AWS = require('aws-sdk')
import path from "path";



AWS.config.update({
    accessKeyId: process.env.S3_ACCESSID,
    secretAccessKey: process.env.S3_SECRETID
});

var s3 = new AWS.S3({});
var bucketName = process.env.S3_BUCKET_NAME;

    export async function uploadSigleFileToS3(document: any,folder:string) {
    const allowtype = /jpeg|jpg|png|pdf|mpeg|html|mp4/;
    const fileType = document.mimetype;
    // let thumbnailLocation : any;
    const imageTypeExist = allowtype.exec(fileType);
    if (imageTypeExist) {
      const mBuffer = document.buffer;
      const originalName = document.originalname;
      const fileName = `${Date.now()}_${path.extname(originalName)}`;
      const folderName = folder 
  
      const params = {
        Bucket: bucketName,
        Key: `public/${folderName}/${fileName}`,
        Body: mBuffer,
        ACL: 'public-read'
      };
      var location = await (await s3.upload(params).promise()).Location;
      return location
    }
}

module.exports = {
    uploadSigleFileToS3
}