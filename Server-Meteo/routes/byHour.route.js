import { Router } from "express";
import { deleteByHourHistory, getByHourHistory, updateByHourHistory } from "../controllers/byhour.controller.js";

const byHourRoute = Router();

byHourRoute.get("/byhourhistory", getByHourHistory);
byHourRoute.put("/byhourhistory", updateByHourHistory);
byHourRoute.delete("/byhourhistory", deleteByHourHistory);

export default byHourRoute;