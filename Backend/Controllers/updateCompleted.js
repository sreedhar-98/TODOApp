import { dynamodb } from "../Configurations/dynamoDBconfig.js";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const updateCompleted = async (req, res) => {
  try {
    const todoId = req.params.id;
    const UserId = req.body.userId;
    if (!todoId) {
      return res.status(400).json({
        error: "Missing TODO ID.",
      });
    }
    const command = new UpdateCommand({
      TableName: "TODO",
      Key: { todoId: todoId, userId: UserId },
      UpdateExpression: "SET completed = :completed,completedAt=:completedAt",
      ConditionExpression: "attribute_exists(todoId)",
      ExpressionAttributeValues: {
        ":completed": true,
        ":completedAt": Math.floor(Date.now() / 1000).toString(),
      },
      ConditionExpression: "attribute_exists(todoId)", 
      ReturnValues: "ALL_NEW",
    });
    const { Attributes } = await dynamodb.send(command);
    const { userId, ...responseObject } = Attributes;
    return res.status(200).json(responseObject);
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException")
      return res.status(404).json({ error: "TODO not found" });
    return res.status(500).json({ error: "Failed to update TODO" });
  }
};

export default updateCompleted;
