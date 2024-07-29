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
 *  description: Cet endpoint vous renvoir les données historiques.
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Apprenant:
 *      type: object
 *      required:
 *          - nom
 *          - email
 *          - password
 *          - role
 *      properties:
 *          matricule:
 *              type: string 
 *              description: L'id autogeneré pour l'apprenant
 *          nom:
 *              type: string
 *              description: Nom de l'apprenant
 *          telephone:
 *              type: string
 *              description: Le numéro de téléphone de l'apprenant
 *          email:
 *              type: string
 *              description: L'email  de l'apprenant
 *          password:
 *              type: string
 *              description: Le mot de passe  de l'apprenant
 *          role:
 *              type: string
 *              description: Le role  de l'apprenant
 *          prenom:
 *              type: string
 *              description: Le nom  de l'apprenant
 *          postNom:
 *              type: string
 *              description: Le post-nom  de l'apprenant
 *          adresse:
 *              type: string
 *              description: L'adresse  de l'utilisateur
 *          dateNaissance:
 *              type: sateTime
 *              description: L'email  de l'utilisateur
 *      example:
 *          matricule: 45_3JID749
 *          nom: Cubaka
 *          telephone: 0987654321
 *          email: monnom@gmail.com
 *          password: 12345
 *          role: apprenant
 *          prenom: Gerard
 *          postNom: Bisimwa
 *          adresse: 23Avenue du Web, Commune Diginal, Ville Internet, Pays Republique Numerique
 *          dateNaissance: '1999-09-09T00:00:00.000Z'
 */



/**
 * @swagger
 * /apprenants:
 *    get:
 *      summary: Ce chemin rammène tous les apprenants
 *      tags: [Apprenants]
 *      responses:
 *        '200':
 *          description: Succès
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/Apprenant' 
 *          '500':
 *              description: Error serveur
 * 
 */

/**
 * @swagger
 * /apprenants:
 *    post:
 *      summary: Ce chemin crée un apprenant
 *      tags: [Apprenants]
 *      resquestBody:
 *          required: true
 *          content:
 *             application/json:
 *                 schema: 
 *                     type: array
 *                     items: 
 *                         $ref: '#/components/schemas/Apprenant'
 *      responses:
 *        '200':
 *          description: L'apprenant a été crée avec succès
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: array
 *                      items: 
 *                          $ref: '#/components/schemas/Apprenant' 
 *          '404':
 *              description: Données de l'apprenant invalides
 *          '500':
 *              description: Error serveur
 * 
 */








