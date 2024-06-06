import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({});
const s3 = client;

const handler = async (event) => {
  const bucketName = 'saveclickbucket'; 
  const fileName = event.fileName
  const fileType = event.fileType
  const fileContent = event.fileContent
  // const { fileName, fileType, fileContent } = JSON.parse(event.body);

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: Buffer.from(fileContent, 'base64'),
    ContentEncoding: 'base64',
    ContentType: fileType
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File uploaded successfully', data }),
      headers: {
          'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'File upload failed', error }),
      headers: {
          'Content-Type': 'application/json'
      }
    };
  }
};

export { handler };
