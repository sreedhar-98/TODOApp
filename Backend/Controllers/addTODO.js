import { dynamodb } from "../Configurations/dynamoDBconfig.js";
import { v4 as uuidv4 } from "uuid";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
dotenv.config();

const addTODO = async (req, res) => {
  try {
    const task = req.body.task;
    const userId = req.body.userId;
    const todoId = uuidv4();
    const max_random_offset=50;
    const randomOffset = Math.floor(Math.random() * max_random_offset);
    const createdAt = (Math.floor(Date.now() / 1000))+randomOffset;

    const command = new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        userId: userId,
        todoId: todoId,
        completed: false,
        createdAt: createdAt,
        task: task,
      },
    });
    await dynamodb.send(command);
    return res
      .status(201)
      .json({
        completed: false,
        todoId: todoId,
        createdAt: createdAt,
        task: task,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add TODO" });
  }
};

export default addTODO;
