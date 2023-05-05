import S3 from "aws-sdk/clients/s3.js";
import fs from 'fs';

const accessKeyId = "jwhpijbczhaiqhjtgyezhpnjgqva";
const secretAccessKey = "jzo6phdw3pssdyzav37whrlt3o2xrjmdoczrotikowsalwsfkf6ma";
const endpoint = "https://gateway.storjshare.io";

const s3 = new S3({
  accessKeyId,
  secretAccessKey,
  endpoint,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
  connectTimeout: 0,
  httpOptions: { timeout: 0 }
});

///////////////////////////// List Buckets

(async () => {

  const { Buckets } = await s3.listBuckets({}).promise();

  console.log(Buckets);

})();

/////////////////////////// Upload

(async () => {

  // `file` can be a readable stream in node or a `Blob` in the browser

  // read file into memory as a buffer
  const buffer = fs.readFileSync('./my-image.jpg');

  // create a new buffer from the file buffer
  const fileBuffer = Buffer.from(buffer);

  const params = {
    Bucket: "demo-bucket",
    Key: "my-image.jpg",
    Body: fileBuffer
  };

  await s3.upload(params, {
    partSize: 64 * 1024 * 1024
  }).promise();

})();

//////////////////////////// Get Signed URL

(async () => {
  const params = {
    Bucket: "demo-bucket",
    Key: "my-image.jpg",
  }

  const url = s3.getSignedUrl("getObject", params);

  // e.g. create an <img> where src points to url
  console.log(url);
})();
