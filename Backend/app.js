import express from "express";
import data_router from "./routes/crudRoutes.js";
//import authMiddleware from "./Middleware/authMiddleware.js";

const app = express();

app.use(express.json());
//app.use(authMiddleware);
app.use("/data", data_router);


app.listen(3500, () => console.log("Server Started on port : 3500"));
