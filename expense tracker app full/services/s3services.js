const AWS = require("aws-sdk");
const uploadToS3=(data, filename)=>{
  BUCKET_NAME = "expenses2";
  const IAM_USER_KEY = "AKIASHZCGUYXXTILWICM";
  const IAM_USER_SECRET = "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";
  
  const s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });
  console.log('i am called')
    var params = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL: "public-read",
    };
    return new Promise((resolve, reject) => {
      s3bucket.upload(params, (err, s3response) => {
        if (err) {
          console.log("Error uploading file." + err);
          reject(err);
        } else {
          console.log("success", s3response);
          resolve(s3response.Location);
        }
      });
    });
  }

  module.exports = {uploadToS3}