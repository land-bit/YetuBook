import { Op } from 'sequelize';
import { db } from '../dbconnection/db.js'

export async function postAllWeatherData (req, res){
    const { longitude, latitude } = req.query;
    const weatherdata = await getGoodFormatWeatherData(longitude, latitude);
    const { localisation, currentWeather, currentHour, byHour, next5Days, airPollution } = weatherdata;
    try {
        const newLocation = await db.localisation.create({ data: localisation });
        const newAirPollution = await db.airPollution.create({ data: airPollution });
        const newCurrentWeather = await db.currentWeather.create({ data: currentWeather });
        const newCurrentHour = await db.currentHour.create({ data: currentHour });
        const newByHour = await db.byHour.createMany({ data: byHour });
        const newNext5Days = await db.next5days.createMany({ data: next5Days });
        res.status(201).json(weatherdata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    };
}

export async function getAllHistoricalWeatherData (req, res){

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
        console.log("Format de date non supporté voici un expemple du bon format '10-Avril-2024' ");
    }

    try {
        // Recherche dans la base de données pour une entrée correspondante à la date  
        const localisation = await db.localisation.findMany({
            where: {
                date: formattedDate
            }
        });
        const currentWeather = await db.currentWeather.findMany({
            where: {
                date: formattedDate
            }
        });
        const currentHour = await db.currentHour.findMany({
            where: {
                date: formattedDate
            }
        });
        const byHour = await db.byHour.findMany({
            where: {
                date: formattedDate
            }
        });
        const next5Days = await db.next5days.findMany({
            where: {
                date: formattedDate
            }
        });
        const airPollution = await db.airPollution.findMany({
            where: {
                date: formattedDate
            }
        });

        // console.log(localisation, currentWeather, currentHour, byHour, next5Days, airPollution)

        // Vérification si des données ont été trouvées  
        if (!airPollution[0] && !localisation[0] && !currentWeather[0] && !currentHour[0] && !byHour[0] && !next5Days[0]) {
            return res.status(404).json({ error: "Données météorologiques non trouvées pour cette date" });
        }

        // Envoi de la réponse avec les données de pollution  
        res.status(200).json({
            airPollution: airPollution[0],
            localisation: localisation[0],
            currentWeather: currentWeather[0],
            currentHour: currentHour[0],
            byHour: byHour,
            next5Days: next5Days
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }

}