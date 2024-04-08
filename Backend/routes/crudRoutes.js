import express from "express";
import addTODO from "../Controllers/addTODO.js";
import deleteTODO from "../Controllers/deleteTODO.js";
import getTODO from "../Controllers/getTODO.js";
import updateTODO from "../Controllers/updateTODO.js";


const data_router = express.Router();

data_router.post("/", addTODO).get("/", getTODO);

data_router.route("/:id").patch(updateTODO).delete(deleteTODO);


export default data_router;
