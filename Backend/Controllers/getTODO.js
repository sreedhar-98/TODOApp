import { dynamodb } from "../Configurations/dynamoDBconfig.js";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
dotenv.config();

const getTODO = async (req, res) => {
  try {
    const userId = req.body.userId;
    const LastKey = req.query?.lastkey;
    const include = LastKey ? true : false;
    const LIMIT = 2;
    const command = new QueryCommand({
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
      Limit: LIMIT + 1,
      ExclusiveStartKey: include
        ? { userId: userId, createdAt: parseInt(LastKey) }
        : undefined,
      ScanIndexForward: false,
    });
    const result = await dynamodb.send(command);
    const todos = result.Items || [];
    const LastEvaluatedKey = result?.LastEvaluatedKey;
    return res.status(200).json({
      todos: !LastEvaluatedKey ? todos : todos.slice(0, -1),
      LastEvaluatedKey: !LastEvaluatedKey
        ? undefined
        : todos[todos.length - 2].createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch TODO's" });
  }
};

export default getTODO;
