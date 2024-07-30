import { Router } from "express";
import { getAllHistoricalWeatherData, getAllWeatherData } from "../controllers/allWeatherData.controllers.js";

const allWeatherDataRouter = Router();

allWeatherDataRouter.get("/yetubook/meteodata", getAllWeatherData);
allWeatherDataRouter.get("/yetubook/meteodata/history", getAllHistoricalWeatherData);

export default allWeatherDataRouter;

/**
 * @swagger
 * tags:
 *  name: Optenir les Données Météorologique Actuelles et Historiques
 *  description: Optenez tous les types données historiques. 
 */


/**
 * @swagger
 * /yetubook/meteodata/history?date=30-Juillet-2024:
 *    get:
 *      summary: Ce chemin rammène toutes les données historiques disponible pour une date précise au format ex 30-Juillet-2024
 *      tags: [One call to get all different types of Weather data]
 *      responses:
 *        '200':
 *          description: Succès
 *          content:
 *              yetubook/meteodata/history/json:
 *                  schema: 
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/yetubook/meteodata/history' 
 *          '500':
 *              description: Error serveur
 * 
 */

/**
 * @swagger
 * /yetubook/meteodata?longitude=29.2205&latitude=-1.6585:
 *    get:
 *      summary: Ce chemin enregistre des nouvelles données météorologiques pour l'heure actuelle et la date d'aujourd'hui dans la base de donnée et vous les renvoies
 *      tags: [One call to register all different types of Weather data in the DB]
 *      resquestBody:
 *          required: true
 *          content:
 *             application/json:
 *                 schema: 
 *                     type: array
 *                     items: 
 *                         $ref: '#/components/schemas/AllWeatherData'
 *      responses:
 *        '200':
 *          description: Les données actuelles ont été enregistrées avec succès
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/AllWeatherData' 
 *          '404':
 *              description: Données météorologiques non trouvées pour cette date
 *          '500':
 *              description: Error serveur
 * 
 */








