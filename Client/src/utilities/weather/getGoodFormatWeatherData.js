import getAlert from '../ai/getAlert';
import getAirPollution from './getAirPollution';
import getCurrentWeather from './getCurrentWeather';
import FormatUtils from './getFormat';
import getPrevisionMeteo from './getPrevisionMeteo';

const formatUtils = new FormatUtils();

const getGoodFormatWeatherData = async () => {

    const prevision = await getPrevisionMeteo();
    const currentWeather = await getCurrentWeather();
    const airPollution = await getAirPollution();
    const alert = await getAlert(prevision);
    
    let byHour = [], currDt = prevision.list[0].dt_txt.slice(8, 10), next5Days = [];

    for (let i = 0; i < 6; i++) {
        byHour.push({
            'date': formatUtils.getShortDate(prevision.list[i].dt_txt),
            'day': formatUtils.getDay(prevision.list[i].dt_txt).slice(0, 3),
            'time': formatUtils.getDisplayTime(prevision.list[i].dt_txt),
            'temp': Math.round(prevision.list[i].main.temp),
            'desc': formatUtils.capitalizeFirstLetters(prevision.list[i].weather[0].description),
            'weatherType': prevision.list[i].weather[0].main,
            'weatherIcon': prevision.list[i].weather[0].icon,
            'minTemp': Math.floor(prevision.list[i].main.temp_min),
            'maxTemp': Math.ceil(prevision.list[i].main.temp_max),
            'Kalmanfilter': prevision.list[i].main.temp_kf,
            'humidity': prevision.list[i].main.humidity,
            'wind-speed': prevision.list[i].wind.speed,
            'wind-deg': prevision.list[i].wind.deg,
            'wind-dir': formatUtils.getWindDirection(prevision.list[i].wind.deg),
            'wind-gust': prevision.list[i].wind.gust,
            'pop': prevision.list[i].pop,
            'rain': prevision.list[i].rain ? prevision.list[i].rain['3h'] : 0,
            'snow': prevision.list[i].snow ? prevision.list[i].snow['3h'] : 0,
            'pressure': prevision.list[i].main.pressure,
            'clouds': prevision.list[i].clouds.all,
            'part-of-the-day': prevision.list[i].sys.pod == 'd' ? 'Jour' : 'Nuit',
            'period-of-the-day': formatUtils.getPeriod(prevision.list[i].dt),
            // 'uvi': prevision.list[i].main.uvi,
            'feelsLike': Math.round(prevision.list[i].main.feels_like),
            'grndLevel': prevision.list[i].main.grnd_level,
            'seaLevel': prevision.list[i].main.sea_level,
            'visibility': prevision.list[i].visibility,
            'windChill': formatUtils.calculateWindChill(prevision.list[i].main.temp, prevision.list[i].wind.speed),
            'dewPoint': formatUtils.calculateWindChill(prevision.list[i].main.temp, prevision.list[i].main.humidity),
            'uvi': formatUtils.calculateUVI(prevision.city.coord.lat, 1500, parseInt(prevision.list[i].dt_txt.split(' ')[1].split(':')[0]), prevision.list[i].clouds.all)
        });
    };

    for (let i = 0; i < prevision.list.length; i++) {
        if (currDt === prevision.list[i].dt_txt.slice(8, 10)) continue;
        currDt = prevision.list[i].dt_txt.slice(8, 10);
        next5Days.push({
            'time': formatUtils.getDisplayTime(prevision.list[i].dt_txt),
            'day': formatUtils.getDay(prevision.list[i].dt_txt).slice(0, 3),
            'date': formatUtils.getShortDate(prevision.list[i].dt_txt),
            'desc': formatUtils.capitalizeFirstLetters(prevision.list[i].weather[0].description),
            'weatherType': prevision.list[i].weather[0].main,
            'weatherIcon': prevision.list[i].weather[0].icon,
            'minTemp': Math.floor(prevision.list[i].main.temp_min),
            'maxTemp': Math.ceil(prevision.list[i].main.temp_max),
            'Kalmanfilter': prevision.list[i].main.temp_kf,
            'humidity': prevision.list[i].main.humidity,
            'wind-speed': prevision.list[i].wind.speed,
            'wind-deg': prevision.list[i].wind.deg,
            'wind-dir': formatUtils.getWindDirection(prevision.list[i].wind.deg),
            'wind-gust': prevision.list[i].wind.gust,
            'pop': prevision.list[i].pop,
            'rain': prevision.list[i].rain ? prevision.list[i].rain['3h'] : 0,
            'snow': prevision.list[i].snow ? prevision.list[i].snow['3h'] : 0,
            'pressure': prevision.list[i].main.pressure,
            'clouds': prevision.list[i].clouds.all,
            'part-of-the-day': prevision.list[i].sys.pod == 'd' ? 'Jour' : 'Nuit',
            'period-of-the-day': formatUtils.getPeriod(prevision.list[i].dt),
            // 'uvi': prevision.list[i].main.uvi,
            'feelsLike': Math.round(prevision.list[i].main.feels_like),
            'grndLevel': prevision.list[i].main.grnd_level,
            'seaLevel': prevision.list[i].main.sea_level,
            'visibility': prevision.list[i].visibility,
            'windChill': formatUtils.calculateWindChill(prevision.list[i].main.temp, prevision.list[i].wind.speed),
            'dewPoint': formatUtils.calculateWindChill(prevision.list[i].main.temp, prevision.list[i].main.humidity),
            'uvi': formatUtils.calculateUVI(prevision.city.coord.lat, 1500, prevision.list[i].dt_txt.split(' ')[1].split(':')[0], prevision.list[i].clouds.all)
        });
    };

    return {
        'location': {
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
            'time': formatUtils.getFormattedTodayHour(),
            'desc': formatUtils.capitalizeFirstLetters(currentWeather.weather[0].description),
            'weatherType': currentWeather.weather[0].main,
            'weatherIcon': currentWeather.weather[0].icon,
            'base': currentWeather.base,
            'clouds': currentWeather.clouds.all,
            'visibility': currentWeather.visibility,
            'wind-speed': currentWeather.wind.speed,
            'wind-gust': currentWeather.wind.gust,
            'wind-deg': currentWeather.wind.deg,
            'wind-dir': formatUtils.getWindDirection(currentWeather.wind.deg),
            'pressure': currentWeather.main.pressure,
            'humidity': currentWeather.main.humidity,
            'feelsLike': Math.round(currentWeather.main.feels_like),
            'temp': Math.round(currentWeather.main.temp),
            'temp_min': Math.floor(currentWeather.main.temp_min),
            'temp_max': Math.ceil(currentWeather.main.temp_max),
            'grndLevel': currentWeather.main.grnd_level,
            'seaLevel': currentWeather.main.sea_level,
            'dewPoint': formatUtils.calculateDewPoint(currentWeather.main.temp, currentWeather.main.humidity),
            'uvi': formatUtils.calculateUVI(currentWeather.coord.lat, 1500, formatUtils.getFormattedTodayHour().split(':')[0], currentWeather.clouds.all),
            'alert': alert
        },
        'currentHour': {
            'date': formatUtils.getFormattedTodayDate(),
            'time': formatUtils.getFormattedTodayHour(),
            'pop': prevision.list[0].pop,
            'temperature': Math.round(prevision.list[0].main.temp),
            'desciption': formatUtils.capitalizeFirstLetters(prevision.list[0].weather[0].description),
            'weatherType': prevision.list[0].weather[0].main,
            'weatherIcon': prevision.list[0].weather[0].icon,
            'clouds': prevision.list[0].clouds.all,
            'visibility': prevision.list[0].visibility,
            'minTemp': Math.floor(prevision.list[0].main.temp_min),
            'maxTemp': Math.ceil(prevision.list[0].main.temp_max),
            'wind-speed': prevision.list[0].wind.speed,
            'wind-gust': prevision.list[0].wind.gust,
            'wind-deg': prevision.list[0].wind.deg,
            'wind-dir': formatUtils.getWindDirection(prevision.list[0].wind.deg),
            'pressure': prevision.list[0].main.pressure,
            'rain': prevision.list[0].rain ? prevision.list[0].rain['3h'] : 0,
            'humidity': prevision.list[0].main.humidity,
            'sunrise': formatUtils.getTimeFromTimeStamp(prevision.city.sunrise),
            'sunset': formatUtils.getTimeFromTimeStamp(prevision.city.sunset)
        },
        'byHour': byHour,
        'next5Days': next5Days,
        'airPollution':{
            'date': formatUtils.getFormattedTodayDate(),
            'time': formatUtils.getFormattedTodayHour(),
            'aqi': airPollution.list[0].main.aqi,
            'polluants': airPollution.list[0].components,
        },
        'alert': alert
    };
}

export default getGoodFormatWeatherData;


