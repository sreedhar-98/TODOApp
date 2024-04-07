import { dynamodb } from "../Configurations/dynamoDBconfig.js";
import { v4 as uuidv4 } from "uuid";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const addTODO = async (req, res) => {
  try {
    const task = req.body.task;
    const userId = req.body.userId;
    const todoId = uuidv4();
    const createdAt = Math.floor(Date.now() / 1000).toString();

    const command = new PutCommand({
      TableName: "TODO",
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
