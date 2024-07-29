import { Router } from "express";
import { deleteLocalisationHistory, getLocalisationHistory, updateLocalisationHistory } from "../controllers/localisation.controller.js";


const localisationRoute = Router();

localisationRoute.get("/localisationhistory", getLocalisationHistory);
localisationRoute.put("/localisationhistory", updateLocalisationHistory);
localisationRoute.delete("/localisationhistory", deleteLocalisationHistory);

export default localisationRoute;
