import { Router } from "express";
import { deleteByHourHistory, getByHourHistory, updateByHourHistory } from "../controllers/byhour.controller.js";

const byHourRoute = Router();

byHourRoute.get("/byhourhistory", getByHourHistory);
// byHourRoute.put("/byhourhistory", updateByHourHistory);
// byHourRoute.delete("/byhourhistory", deleteByHourHistory);

export default byHourRoute;


/**
 * @swagger
 * components:
 *  schemas:
 *    Forcast by hour:
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
 *              description: Le temps au formant timestamp
 *          city:
 *              type: string
 *              description: La ville
 *          time:
 *              type: string
 *              description: L'heure de l'enregristrement
 *          tempMin:
 *              type: integer
 *              description: La température minimale
 *          tempMax:
 *              type: integer
 *              description: La tempétature maximale
 *          temperature:
 *              type: integer
 *              description: La température ambiante
 *          humidity:
 *              type: integer
 *              description: La concentration des vapeurs d'eau dans l'air
 *          rain:
 *              type: float
 *              description: La précipitation ou la hauteur de pluie en mm
 *          snow:
 *              type: float
 *              description: La précipitation des neiges
 *          pressure:
 *              type: integer
 *              description: La pression atmosphérique
 *          description:
 *              type: string
 *              description: La description du temps qu'il fait dehors
 *          base:
 *              type: string
 *              description: La base de prise de mesure, stations météorologiques ou satellites
 *          clouds:
 *              type: integer
 *              description: La description du temps qu'il fait dehors
 *          visibility:
 *              type: integer
 *              description: La visibilité en météorologie fait référence à la distance à laquelle un objet peut être clairement distingué
 *          windSpeed:
 *              type: integer
 *              description: La vitesse du vent
 *          windGust:
 *              type: float
 *              description: Les rafales des vents ou des augmentations soudaines et temporaires de la vitesse du vent
 *          windDeg:
 *              type: integer
 *              description: Orientation du vent en degré
 *          windDir:
 *              type: string
 *              description: Direction du vent
 *          windChill:
 *              type: integer
 *              description: La composante de la température et de l'humidité qui est la température ressenti par le corps humain
 *          feelsLike:
 *              type: integer
 *              description: La température ressenti
 *          dewPoint:
 *              type: integer
 *              description: Le point de rosé ou  la température à laquelle l'air devient saturé en humidité, entraînant la condensation de la vapeur d'eau en gouttes
 *          weatherType:
 *              type: string
 *              description: Type de temps qu'il faut
 *          weatherIcon:
 *              type: string
 *              description: L'icon lié au type de temps qu'il faut
 *          pop:
 *              type: integer
 *              description: L'icon lié au type de temps qu'il faut
 *          
 * 
 */



/**
 * @swagger
 * /byhourhistory?date=30-Juillet-2024:
 *    get:
 *      summary: Ce chemin rammène les prévision heure par heure d'une date du passé
 *      tags: [Fostcast by hour data history]
 *      responses:
 *        '200':
 *          description: Succès
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/Forcast by hour' 
 *          '500':
 *              description: Error serveur
 * 
 */
