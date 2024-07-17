const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Oaût', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

export default class FormatUtils {
    getformattedTodayDate = () => {
        const today = new Date();
        const day = days[today.getDay()];
        const date = today.getDate();
        const month = months[today.getMonth()];
        return `${day} le ${date} ${month}`;
    };

    getTimeFromTimeStamp = (timeStamp) => {
        const date = new Date(timeStamp * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return (hours < 10 ? `0${hours}` : hours) + ':' + (minutes < 10 ? `0${minutes}` : minutes);
    };

    getHourOfDay = (timeStamp) => {
        const date = new Date(timeStamp * 1000);
        const hours = date.getHours();
        return hours;
    };

    getDisplayTime = (dateString) => {
        const date = new Date(dateString);
        var hours = date.getHours();
        return (hours < 10 ? `0${hours}h` : `${hours}h`);
    };

    getWindDirection = (deg) => {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const val = Math.floor((deg / 22.5) + 0.5);
        return directions[val % 16];
    };

    calculateDewPoint(temperature, humidity) {
        // Calcul du rapport d'humidité à partir de l'humidité relative
        const humidityRatio = 0.622 * (humidity / (100 - humidity));

        // Calcul de la pression de vapeur saturante
        const saturationVaporPressure = 6.11 * Math.pow(10, (7.5 * temperature) / (237.3 + temperature));

        // Calcul du point de rosée
        const dewPoint = (237.3 * Math.log(humidityRatio * saturationVaporPressure / 6.11)) / (7.5 - Math.log(humidityRatio * saturationVaporPressure / 6.11));

        return dewPoint;
    }

    calculateUVI(latitude, altitude, hourOfDay, cloudCover) {
        // Constantes pour le calcul de l'UVI
        const a = 0.128;
        const b = 0.029;
        const c = 0.038;
        const d = 0.715;

        // Calcul de l'angle zénithal solaire
        const solarZenithAngle = Math.acos(
            Math.sin((latitude * Math.PI) / 180) *
            Math.sin((23.44 * Math.PI) / 180 * Math.cos(((hourOfDay - 12) * 15) * Math.PI / 180)) +
            Math.cos((latitude * Math.PI) / 180) *
            Math.cos((23.44 * Math.PI) / 180) *
            Math.cos(((hourOfDay - 12) * 15) * Math.PI / 180)
        );

        // Calcul de l'UVI
        let uvi =
            a *
            Math.exp(
                -b *
                (solarZenithAngle * 180 / Math.PI) -
                c *
                Math.pow(altitude, d)
            );

        // Ajustement en fonction de la couverture nuageuse
        uvi *= 1 - 0.7 * cloudCover / 100;

        return Math.max(0, uvi.toFixed(1));
    }



    calculateWindChill(temperature, windSpeed) {
        // Formule de calcul du windChill selon le Service météorologique national américain
        const windChillFactor = 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
        return Math.round(windChillFactor);
    }

    capitalizeFirstLetters = s => {
        if (!s) return '';
        return s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    getDay = (dateString) => days[new Date(dateString).getDay()];

    getShortDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    };

    getPeriod = (timestamp) => {
        const hours = new Date(timestamp * 1000).getHours();
        if (hours >= 0 && hours < 6) {
            return 'Nuit';
        } else if (hours >= 6 && hours < 12) {
            return 'Matin';
        } else if (hours >= 12 && hours < 18) {
            return 'Journée';
        } else {
            return 'Soir';
        }
    };
}