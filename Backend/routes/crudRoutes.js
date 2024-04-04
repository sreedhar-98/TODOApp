import express from "express";
import addTODO from "../Controllers/addTODO.js";
import deleteTODO from "../Controllers/deleteTODO.js";
import getTODO from "../Controllers/getTODO.js";
import updateTODO from "../Controllers/updateTODO.js";
import updateCompleted from "../Controllers/updateCompleted.js";

const data_router = express.Router();

data_router.post("/", addTODO).get("/", getTODO);

data_router.route("/:id").patch(updateTODO).delete(deleteTODO);

data_router.patch("/updateCompleted/:id", updateCompleted);

export default data_router;
