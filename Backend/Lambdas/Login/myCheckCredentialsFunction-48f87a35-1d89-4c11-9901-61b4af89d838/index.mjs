import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

const handler = async (event) => {
  console.log('Event:', event);
  const email=event.email
  const password=event.password
  
  try{

    const getParams = {
      TableName: 'users',
      Key: {
        email
      }
    };


    const data = await dynamodb.send(new GetCommand(getParams));

    if (!data.Item) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Wrong credentials, try again' }),
        headers: {
                    'Content-Type': 'application/json'
        }
      };
    }


    if (password === data.Item.password) {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Login successful" }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Wrong password" }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
  } catch (error) {
    console.log(error);
    return {
        statusCode: 500,
        body: JSON.stringify({ message: "An error occurred" }),
        headers: {
            'Content-Type': 'application/json'
        }
    };
  }
};

export { handler };
