import { dynamodb } from "../Configurations/dynamoDBconfig.js";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const updateCompleted = async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.body.userId;
    const completed = req.body.completed;
    if (!todoId || !userId || typeof completed !== "boolean") {
      return res.status(400).json({
        error: "Missing TODO ID, userId, or invalid 'completed' value",
      });
    }
    const command = new UpdateCommand({
      TableName: "TODO",
      Key: { todoId: todoId, userId: userId },
      UpdateExpression: "SET completed = :completed,completedAt=:completedAt",
      ConditionExpression: "attribute_exists(todoId)",
      ExpressionAttributeValues: {
        ":completed": completed,
        ":completedAt": Math.floor(Date.now() / 1000).toString(),
      },
      ConditionExpression: "attribute_exists(todoId)", // Ensure item exists
      ReturnValues: "UPDATED_NEW",
    });
    await dynamodb.send(command);
    return res.status(200).json({ message: "TODO completed status updated" });
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException")
      return res.status(404).json({ error: "TODO not found" });
    return res.status(500).json({ error: "Failed to update TODO" });
  }
};

export default updateCompleted;
