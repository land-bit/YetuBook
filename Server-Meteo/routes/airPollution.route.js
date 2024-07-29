import { Router } from "express";
import { deleteAirPollutionHistory, getAirPollutionHistory, updateAirPollutionHistory } from "../controllers/airpollution.controller.js";

const airPollutionRoute = Router();

airPollutionRoute.get("/airpollutionhistory", getAirPollutionHistory);
airPollutionRoute.put("/airpollutionhistory", updateAirPollutionHistory);
airPollutionRoute.delete("/airpollutionhistory", deleteAirPollutionHistory);

export default airPollutionRoute;
