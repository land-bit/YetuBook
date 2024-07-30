import { Op } from 'sequelize';
import { db } from '../dbconnection/db.js'

export async function getByHourHistory(req, res) {
    // Récupération de la date depuis les paramètres de requête  
    const date = req.query.date;

    // Vérification si la date est fournie  
    if (!date) {
        return res.status(400).json({ error: "Date manquante, veuillez fournir la date" });
    }

    // Formater la date pour format interne
    const regex = /le-(\d{1,2})-(\w+)-(\d{4})/; // Expression régulière pour capturer le jour, le mois et l'année

    const match = date.match(regex);

    let formattedDate;
    if (match) {
        const day = match[2]; // Le jour
        const month = match[3]; // Le mois
        const year = match[4]; // L'année

        // Formater le résultat
        formattedDate = `${day} ${month} ${year}`;
    } else {
        console.log("Format de date non supporté voici un expemple du bon format '30-Juillet-2024' ");
    }

    

    try {
        // Recherche dans la base de données pour une entrée correspondante à la date  
        const byHour = await db.byHour.findMany({
            where: {
                date: formattedDate
            }
        });

        // Vérification si des données ont été trouvées  
        if (!byHour[0]) {
            return res.status(404).json({ error: "Données de pollution non trouvées pour cette date" });
        }

        // Envoi de la réponse avec les données de pollution  
        res.status(200).json(byHour[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

export async function updateByHourHistory(req, res) {

}

export async function deleteByHourHistory(req, res) {

}
