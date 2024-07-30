import { Router } from "express";
import { deleteAirPollutionHistory, getAirPollutionHistory, updateAirPollutionHistory } from "../controllers/airpollution.controller.js";

const airPollutionRoute = Router();

airPollutionRoute.get("/airpollutionhistory", getAirPollutionHistory);
// airPollutionRoute.put("/airpollutionhistory", updateAirPollutionHistory);
// airPollutionRoute.delete("/airpollutionhistory", deleteAirPollutionHistory);

export default airPollutionRoute;


/**
 * @swagger
 * components:
 *  schemas:
 *    Air pollution history:
 *      type: object
 *      required:
 *          - date
 *      properties:
 *          id:
 *              type: string 
 *              description: L'identifiant de l'enregistrement
 *          date:
 *              type: string
 *              description: Date de l'enregistrement
 *          dt:
 *              type: string
 *              description: Le temps au formant timestamp *     
 *          time:
 *              type: string
 *              description: L'heure de l'enregristrement
 *          aqi:
 *              type: integer
 *              description: Indice de qualité de l'air
 *          pm25:
 *              type: integer
 *              description: Concentration en particules fines dans l'air dont le diamètre est inférieur ou égal à 2,5 micromètres
 *          pm10:
 *              type: integer
 *              description: Le PM10 fait référence aux particules en suspension dans l'air dont le diamètre est inférieur ou égal à 10 micromètres.
 *          humidity:
 *              type: integer
 *              description: La concentration des vapeurs d'eau dans l'air
 *          c3:
 *              type: integer
 *              description: Le O3 fait référence à l'ozone, qui est un gaz présent dans l'atmosphère
 *          no2:
 *              type: integer
 *              description: Le NO2, ou dioxyde d'azote, est un gaz polluant qui fait partie des oxydes d'azote (NOx).
 *          so2:
 *              type: integer
 *              description: Le SO2, ou dioxyde de soufre, est un gaz incolore avec une odeur âcre, qui est un polluant atmosphérique important.
 *          co:
 *              type: integer
 *              description: Le CO, ou monoxyde de carbone, est un gaz incolore, inodore et toxique qui se forme principalement lors de la combustion incomplète de combustibles fossiles. 
 *          
 * 
 */



/**
 * @swagger
 * /airpollutionhistory?date=30-Juillet-2024:
 *    get:
 *      summary: Ce chemin rammène les données de pollution d'une date du passé
 *      tags: [Air pollution data history]
 *      responses:
 *        '200':
 *          description: Succès
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/Air pollution history' 
 *          '500':
 *              description: Error serveur
 * 
 */
