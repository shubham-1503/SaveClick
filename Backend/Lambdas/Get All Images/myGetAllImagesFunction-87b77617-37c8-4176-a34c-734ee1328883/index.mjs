import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3Client = new S3Client({});

const handler = async (event) => {
    const bucketName = 'saveclickbucket'; 
    
    const bucketParams = {
        Bucket: bucketName,
    };

    try {
        // List objects in the bucket
        const data = await s3Client.send(new ListObjectsV2Command(bucketParams));
        const images = data.Contents.map(item => {
            return {
                key: item.Key,
                url: `https://${bucketName}.s3.amazonaws.com/${item.Key}`
            };
        });

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Enable CORS for your frontend
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET"
            },
            body: JSON.stringify(images),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not retrieve images' }),
        };
    }
};

export { handler };
