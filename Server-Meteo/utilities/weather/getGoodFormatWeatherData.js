import getAlert from '../ai/getAlert.js';
import getAirPollution from './getAirPollution.js';
import getCurrentWeather from './getCurrentWeather.js';
import FormatUtils from './getFormat.js';
import getPrevisionMeteo from './getPrevisionMeteo.js';

const formatUtils = new FormatUtils();

const getGoodFormatWeatherData = async (longitude, latitude) => {

    const prevision = await getPrevisionMeteo(longitude, latitude);
    const currentWeather = await getCurrentWeather(longitude, latitude);
    const airPollution = await getAirPollution(longitude, latitude);
    const alert = await getAlert(prevision);
    let byHour = [], currDt = prevision.list[0].dt_txt.slice(8, 10), next5Days = [];

    for (let i = 0; i < 6; i++) {
        byHour.push({
            'date': formatUtils.getFormattedTodayDate(),
            'shortdate': formatUtils.getShortDate(prevision.list[i].dt_txt),
            'day': formatUtils.getDay(prevision.list[i].dt_txt).slice(0, 3),
            'time': formatUtils.getDisplayTime(prevision.list[i].dt_txt),
            'temperature': Math.round(prevision.list[i].main.temp),
            'dt': prevision.list[i].dt,
            'description': formatUtils.capitalizeFirstLetters(prevision.list[i].weather[0].description),
            'weatherType': prevision.list[i].weather[0].main,
            'weatherIcon': prevision.list[i].weather[0].icon,
            'tempMin': Math.floor(prevision.list[i].main.temp_min),
            'tempMax': Math.ceil(prevision.list[i].main.temp_max),
            'Kalmanfilter': prevision.list[i].main.temp_kf,
            'humidity': prevision.list[i].main.humidity,
            'windSpeed': prevision.list[i].wind.speed,
            'windDeg': prevision.list[i].wind.deg,
            'windDir': formatUtils.getWindDirection(prevision.list[i].wind.deg),
            'windGust': prevision.list[i].wind.gust,
            'pop': prevision.list[i].pop,
            'rain': prevision.list[i].rain ? prevision.list[i].rain['3h'] : 0,
            'snow': prevision.list[i].snow ? prevision.list[i].snow['3h'] : 0,
            'pressure': prevision.list[i].main.pressure,
            'clouds': prevision.list[i].clouds.all,
            'partOfTheDay': prevision.list[i].sys.pod == 'd' ? 'Jour' : 'Nuit',
            'periodOfTheDay': formatUtils.getPeriod(prevision.list[i].dt),
            // 'uvi': prevision.list[i].main.uvi,
            'feelsLike': Math.round(prevision.list[i].main.feels_like),
            'grndLevel': prevision.list[i].main.grnd_level,
            'seaLevel': prevision.list[i].main.sea_level,
            'sunrise': formatUtils.getTimeFromTimeStamp(prevision.city.sunrise),
            'sunset': formatUtils.getTimeFromTimeStamp(prevision.city.sunset),
            'visibility': prevision.list[i].visibility,
            'windChill': formatUtils.calculateWindChill(prevision.list[i].main.temp, prevision.list[i].wind.speed),
            'dewPoint': formatUtils.calculateWindChill(prevision.list[i].main.temp, prevision.list[i].main.humidity),
            'uvi': formatUtils.calculateUVI(prevision.city.coord.lat, 1500, parseInt(prevision.list[i].dt_txt.split(' ')[1].split(':')[0]), prevision.list[i].clouds.all)
        });
    };

    for (let i = 0; i < prevision.list.length; i++) {
        if (currDt === prevision.list[i].dt_txt.slice(8, 10)) continue;
        // currDt = prevision.list[i].dt_txt.slice(8, 10);
        next5Days.push({
            'date': formatUtils.getFormattedTodayDate(),
            'time': formatUtils.getDisplayTime(prevision.list[i].dt_txt),
            'day': formatUtils.getDay(prevision.list[i].dt_txt).slice(0, 3),
            'shortdate': formatUtils.getShortDate(prevision.list[i].dt_txt),
            'dt': prevision.list[i].dt,
            'description': formatUtils.capitalizeFirstLetters(prevision.list[i].weather[0].description),
            'weatherType': prevision.list[i].weather[0].main,
            'weatherIcon': prevision.list[i].weather[0].icon,
            'temperature': Math.round(prevision.list[i].main.temp),
            'tempMin': Math.floor(prevision.list[i].main.temp_min),
            'tempMax': Math.ceil(prevision.list[i].main.temp_max),
            'Kalmanfilter': prevision.list[i].main.temp_kf,
            'humidity': prevision.list[i].main.humidity,
            'windSpeed': prevision.list[i].wind.speed,
            'windDeg': prevision.list[i].wind.deg,
            'windDir': formatUtils.getWindDirection(prevision.list[i].wind.deg),
            'windGust': prevision.list[i].wind.gust,
            'pop': prevision.list[i].pop,
            'rain': prevision.list[i].rain ? prevision.list[i].rain['3h'] : 0,
            'snow': prevision.list[i].snow ? prevision.list[i].snow['3h'] : 0,
            'pressure': prevision.list[i].main.pressure,
            'clouds': prevision.list[i].clouds.all,
            'partOfTheDay': prevision.list[i].sys.pod == 'd' ? 'Jour' : 'Nuit',
            'periodOfTheDay': formatUtils.getPeriod(prevision.list[i].dt),
            // 'uvi': prevision.list[i].main.uvi,
            'feelsLike': Math.round(prevision.list[i].main.feels_like),
            'grndLevel': prevision.list[i].main.grnd_level,
            'seaLevel': prevision.list[i].main.sea_level,
            'visibility': prevision.list[i].visibility,
            'sunrise': formatUtils.getTimeFromTimeStamp(prevision.city.sunrise),
            'sunset': formatUtils.getTimeFromTimeStamp(prevision.city.sunset),
            'windChill': formatUtils.calculateWindChill(prevision.list[i].main.temp, prevision.list[i].wind.speed),
            'dewPoint': formatUtils.calculateWindChill(prevision.list[i].main.temp, prevision.list[i].main.humidity),
            'uvi': formatUtils.calculateUVI(prevision.city.coord.lat, 1500, prevision.list[i].dt_txt.split(' ')[1].split(':')[0], prevision.list[i].clouds.all)
        });
    };

    return {
        'localisation': {
            'date': formatUtils.getFormattedTodayDate(),
            'time': formatUtils.getFormattedTodayHour(),
            'cityName': prevision.city.name,
            'country': prevision.city.country,
            'population': prevision.city.population,
            'timezone': prevision.city.timezone,
            'latitude': prevision.city.coord.lat,
            'longitude': prevision.city.coord.lon
        },
        'currentWeather':{
            'date': formatUtils.getFormattedTodayDate(),
            'dt': currentWeather.dt,
            'time': formatUtils.getFormattedTodayHour(),
            'description': formatUtils.capitalizeFirstLetters(currentWeather.weather[0].description),
            'city': currentWeather.name,
            'weatherType': currentWeather.weather[0].main,
            'weatherIcon': currentWeather.weather[0].icon,
            'base': currentWeather.base,
            'clouds': currentWeather.clouds.all,
            'visibility': currentWeather.visibility,
            'windSpeed': currentWeather.wind.speed,
            'windGust': currentWeather.wind.gust,
            'windDeg': currentWeather.wind.deg,
            'windDir': formatUtils.getWindDirection(currentWeather.wind.deg),
            'pressure': currentWeather.main.pressure,
            'humidity': currentWeather.main.humidity,
            'feelsLike': Math.round(currentWeather.main.feels_like),
            'temperature': Math.round(currentWeather.main.temp),
            'tempMin': Math.floor(currentWeather.main.temp_min),
            'tempMax': Math.ceil(currentWeather.main.temp_max),
            // 'grndLevel': currentWeather.main.grnd_level,
            // 'seaLevel': currentWeather.main.sea_level,
            'windChill': formatUtils.calculateWindChill(currentWeather.main.temp, currentWeather.wind.speed),
            'dewPoint': formatUtils.calculateDewPoint(currentWeather.main.temp, currentWeather.main.humidity),
            'uvi': formatUtils.calculateUVI(currentWeather.coord.lat, 1500, formatUtils.getFormattedTodayHour().split(':')[0], currentWeather.clouds.all),
            'alert': alert
        },
        'currentHour': {
            'date': formatUtils.getFormattedTodayDate(),
            'dt': prevision.list[0].dt,
            'time': formatUtils.getFormattedTodayHour(),
            'pop': prevision.list[0].pop * 100,
            'temperature': Math.round(prevision.list[0].main.temp),
            'description': formatUtils.capitalizeFirstLetters(prevision.list[0].weather[0].description),
            'weatherType': prevision.list[0].weather[0].main,
            'weatherIcon': prevision.list[0].weather[0].icon,
            'clouds': prevision.list[0].clouds.all,
            'visibility': prevision.list[0].visibility,
            'tempMin': Math.floor(prevision.list[0].main.temp_min),
            'tempMax': Math.ceil(prevision.list[0].main.temp_max),
            'windSpeed': prevision.list[0].wind.speed,
            'windGust': prevision.list[0].wind.gust,
            'windDeg': prevision.list[0].wind.deg,
            'windDir': formatUtils.getWindDirection(prevision.list[0].wind.deg),
            'pressure': prevision.list[0].main.pressure,
            'rain': prevision.list[0].rain ? prevision.list[0].rain['3h'] : 0,
            'humidity': prevision.list[0].main.humidity,
            'sunrise': formatUtils.getTimeFromTimeStamp(prevision.city.sunrise),
            'sunset': formatUtils.getTimeFromTimeStamp(prevision.city.sunset),
            'windChill': formatUtils.calculateWindChill(prevision.list[0].main.temp, prevision.list[0].wind.speed),
            'uvi': formatUtils.calculateUVI(prevision.city.coord.lat, 1500, prevision.list[0].dt_txt.split(' ')[1].split(':')[0], prevision.list[0].clouds.all)
        },
        'byHour': byHour,
        'next5Days': next5Days,
        'airPollution':{
            'date': formatUtils.getFormattedTodayDate(),
            'dt': airPollution.list[0].dt,
            'time': formatUtils.getFormattedTodayHour(),
            'aqi': airPollution.list[0].main.aqi,
            'pm25': airPollution.list[0].components.pm25,
            'pm10': airPollution.list[0].components.pm10,
            'o3': airPollution.list[0].components.o3,
            'no2': airPollution.list[0].components.no2,
            'so2': airPollution.list[0].components.so2,
            'co': airPollution.list[0].components.co
        }
    };
}

export default getGoodFormatWeatherData;


