import { dynamodb } from "../Configurations/dynamoDBconfig.js";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
dotenv.config();

const addTODO = async (req, res) => {
  try {
    const task = req.body.task;
    const userId = req.body.userId;
    const createdAt = req.body.createdAt;

    const command = new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        userId: userId,
        completed: false,
        createdAt: createdAt,
        task: task,
      },
    });
    await dynamodb.send(command);
    return res.status(201).json({ message: "Added TODO" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add TODO" });
  }
};

export default addTODO;
