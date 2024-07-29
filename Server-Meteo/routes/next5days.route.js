import { Router } from "express";
import { deleteNext5DaysHistory, getNext5DaysHistory, updateNext5DaysHistory } from "../controllers/next5days.js";

const next5daysRoute = Router();

next5daysRoute.get("/next5dayshistory", getNext5DaysHistory);
next5daysRoute.put("/next5dayshistory", updateNext5DaysHistory);
next5daysRoute.delete("/next5dayshistory", deleteNext5DaysHistory);

export default next5daysRoute;