import { dynamodb } from "../Configurations/dynamoDBconfig.js";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
dotenv.config();

const updateTODO = async (req, res) => {
  try {
    const UserId = req.body.userId;
    const createdAt = parseInt(req.params.id,10);
    const newTask = req.body?.task;
    const markCompleted = req.body.markCompleted;
    const updatedTime=Math.floor(Date.now() / 1000).toString();

    if (!createdAt) return res.status(400).json({ error: "Missing ID" });
    if (!markCompleted && !newTask)
      return res.status(400).json({ error: "Missing updated task" });

    const command = new UpdateCommand({
      TableName: process.env.TABLE_NAME,
      Key: { createdAt: createdAt, userId: UserId },
      UpdateExpression: !markCompleted
        ? "SET task = :newTask, updatedAt = :updatedAt"
        : "SET completed = :completed,completedAt=:completedAt",
      ConditionExpression: "attribute_exists(createdAt)",
      ExpressionAttributeValues: !markCompleted
        ? {
            ":newTask": newTask ? newTask : undefined,
            ":updatedAt": updatedTime,
          }
        : {
            ":completed": true,
            ":completedAt": updatedTime,
          },
      ReturnValues: "ALL_NEW",
    });
    const { Attributes } = await dynamodb.send(command);
    const { userId, ...responseObject } = Attributes;
    return res.status(200).json(responseObject);
  } catch (error) {
    console.error(error);
    if (error.name === "ConditionalCheckFailedException")
      return res.status(404).json({ error: "TODO not found" });
    return res.status(500).json({ error: "Failed to update TODO" });
  }
};

export default updateTODO;
