

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand
} from "@aws-sdk/lib-dynamodb";
 
const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

const handler = async (event) => {
  // const { email, username, password } = JSON.parse(event.body);
  console.log('Event:', event);
  const email=event.email
  const username= event.username
  const password=event.password

  try {
    
    const getParams = {
      TableName: 'users',
      Key: {
        email 
      }
    };
    
    const data = await dynamodb.send(new GetCommand(getParams));
    
    if (data.Item) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'This email already exists, try logging in with the same email' }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }

    const putParams = {
      TableName: 'users',
      Item: {
        email: email,
        username: username,
        password: password,
      },
    };

    await dynamodb.send(new PutCommand(putParams));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Registration Successful' }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not register user', details: error.message }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};

export { handler };
