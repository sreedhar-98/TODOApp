import { dynamodb } from "../Configurations/dynamoDBconfig.js";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const deleteTODO = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.body.userId;
    if (!id)
      return res.status(400).json({ error: "Missing TODO ID in request" });

    const command = new DeleteCommand({
      TableName: "TODO",
      Key: { todoId: id, userId: userId },
    });

    await dynamodb.send(command);

    return res.status(200).json({ message: "TODO deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete TODO" });
  }
};

export default deleteTODO;
