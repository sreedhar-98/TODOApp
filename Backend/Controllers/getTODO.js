import { dynamodb } from "../Configurations/dynamoDBconfig.js";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
dotenv.config();

const getTODO = async (req, res) => {
  try {
    const userId = req.body.userId;
    const LastKey = req.body.LastEvaluatedKey;
    const include = LastKey ? true : false;
    const command = new QueryCommand({
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
      // Limit: 10,
      // ExclusiveStartKey: include ? LastKey : undefined,
      ScanIndexForward:false
    });
    const result = await dynamodb.send(command);
    const todos = result.Items || [];
    const LastEvaluatedKey = result?.LastEvaluatedKey;
    return res.status(200).json({
      todos: todos,
      LastEvaluatedKey: LastEvaluatedKey ? LastEvaluatedKey : null,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch TODO's" });
  }
};

export default getTODO;
