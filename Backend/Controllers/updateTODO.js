import { dynamodb } from "../Configurations/dynamoDBconfig.js";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const updateTODO = async (req, res) => {
  try {
    const UserId = req.body.userId;
    const todoId = req.params.id;
    const newTask = req.body.task;

    if (!todoId) return res.status(400).json({ error: "Missing TODO ID" });
    if (!newTask)
      return res.status(400).json({ error: "Missing updated task" });

    const command = new UpdateCommand({
      TableName: "TODO",
      Key: { todoId: todoId, userId: UserId },
      UpdateExpression: "SET task = :newTask, updatedAt = :updatedAt",
      ConditionExpression: "attribute_exists(todoId)",
      ExpressionAttributeValues: {
        ":newTask": newTask ? newTask : undefined,
        ":updatedAt": Math.floor(Date.now() / 1000).toString(),
      },
      ReturnValues: "ALL_NEW",
    });
    const { Attributes } = await dynamodb.send(command);
    const { userId, ...responseObject } = Attributes;
    return res.status(200).json(responseObject);
  } catch (error) {
    console.error(error)
    if (error.name === "ConditionalCheckFailedException")
      return res.status(404).json({ error: "TODO not found" });
    return res.status(500).json({ error: "Failed to update TODO" });
  }
};

export default updateTODO;
