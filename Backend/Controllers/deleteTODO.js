import { dynamodb } from "../Configurations/dynamoDBconfig.js";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
dotenv.config();

const deleteTODO = async (req, res) => {
  try {
    const id = parseInt(req.params.id,10);
    const userId = req.body.userId;
    if (!id)
      return res.status(400).json({ error: "Missing TODO ID in request" });

    const command = new DeleteCommand({
      TableName: process.env.TABLE_NAME,
      Key: { createdAt: id, userId: userId },
    });

    await dynamodb.send(command);

    return res.status(200).json({ message: "TODO deleted successfully." });
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ error: "Failed to delete TODO" });
  }
};

export default deleteTODO;
