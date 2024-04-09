import { dynamodb } from "../Configurations/dynamoDBconfig.js";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
dotenv.config();

const updateTODO = async (req, res) => {
  try {
    const UserId = req.body.userId;
    const createdAt = parseInt(req.params.id,10);
    const newTask = req.body?.task;
    const completed=req.body.completed;
    const updatedTime=req.body.updatedAt;

    if (!createdAt) return res.status(400).json({ error: "Missing ID" });
    if (!completed && !newTask)
      return res.status(400).json({ error: "Missing updated task" });

    const command = new UpdateCommand({
      TableName: process.env.TABLE_NAME,
      Key: { createdAt: createdAt, userId: UserId },
      UpdateExpression: !completed
        ? "SET task = :newTask, updatedAt = :updatedAt"
        : "SET completed = :completed,updatedAt=:updatedAt",
      ConditionExpression: "attribute_exists(createdAt)",
      ExpressionAttributeValues: !completed
        ? {
            ":newTask": newTask ? newTask : undefined,
            ":updatedAt": updatedTime,
          }
        : {
            ":completed": true,
            ":updatedAt": updatedTime,
          },
    });
    await dynamodb.send(command);
    return res.status(200).json({message:"Updated"});
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException")
      return res.status(404).json({ error: "TODO not found" });
    return res.status(500).json({ error: "Failed to update TODO" });
  }
};

export default updateTODO;
