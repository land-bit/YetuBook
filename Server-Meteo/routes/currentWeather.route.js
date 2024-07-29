import { Router } from "express";
import { deleteCurrentWeatherHistory, getCurrentWeatherHistory, updateCurrentWeatherHistory } from "../controllers/currentweather.controller.js";


const currentWeatherRoute = Router();

currentWeatherRoute.get("/currentweatherhistory", getCurrentWeatherHistory);
currentWeatherRoute.put("/currentweatherhistory", updateCurrentWeatherHistory);
currentWeatherRoute.delete("/currentweatherhistory", deleteCurrentWeatherHistory);

export default currentWeatherRoute;