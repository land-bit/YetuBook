import { Router } from "express";
import { getAllHistoricalWeatherData, postAllWeatherData } from "../controllers/allWeatherData.controllers.js";

const allWeatherDataRouter = Router();

allWeatherDataRouter.post("/yetubook/meteodata", postAllWeatherData);
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
 * components:
 *  schemas:
 *    Apprenant:
 *      type: object
 *      required:
 *          - date
 *      properties:
 *          telephone:
 *              type: string
 *              description: date
 *          
 *      example:
 *          date: 26 Juillet 2024
 */



/**
 * @swagger
 * /apprenants:
 *    get:
 *      summary: Ce chemin rammène toutes les données historiques disponible pour une date précise
 *      tags: [AllWeatherData]
 *      responses:
 *        '200':
 *          description: Succès
 *          content:
 *              AllWeatherData/json:
 *                  schema: 
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/AllWeatherData' 
 *          '500':
 *              description: Error serveur
 * 
 */

/**
 * @swagger
 * /apprenants:
 *    post:
 *      summary: Ce chemin enregistre des nouvelles données météo dans la base de donnée et vous les renvoie
 *      tags: [AllWeatherData]
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








