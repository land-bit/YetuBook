import { Router } from "express";
import { deleteCurrentHourHistory, getCurrentHourHistory, updateCurrentHourHistory } from "../controllers/currenthour.controller.js";

const currentHourRoute = Router();

currentHourRoute.get("/currenthourhistory", getCurrentHourHistory);
currentHourRoute.put("/currenthourhistory", updateCurrentHourHistory);
currentHourRoute.delete("/currenthourhistory", deleteCurrentHourHistory);

export default currentHourRoute;