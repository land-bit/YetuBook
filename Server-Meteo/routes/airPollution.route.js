import { Router } from "express";
import { getAirPollutionHistory } from "../controllers/airpollution.controller.js";

const airPollutionRoute = Router();

airPollutionRoute.get("/airpollutionhistory", getAirPollutionHistory);
// airPollutionRoute.post("/airpollutionhistory", postAirPollutionHistory);
// airPollutionRoute.put("/airpollutionhistory", updateAirPollutionHistory);
// airPollutionRoute.delete("/airpollutionhistory", deleteAirPollutionHistory);

export default airPollutionRoute;
