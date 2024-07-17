import React, { useEffect, useState } from 'react';
import WeatherAPP from './getweatherdata';
import dataPrevisions from "./previsiondataexemple.js"
import FormatUtils from './getFormat';

const formatUtils = new FormatUtils();

export default function Weatherexemple() {

    const [weatherData, setWeatherData] = useState({});

        const response = dataPrevisions;
        let byHour = [], currDt = response.list[0].dt_txt.slice(8, 10), next5Days = [];

        for (let i = 0; i < 6; i++) {
            byHour.push({
                'time': formatUtils.getDisplayTime(response.list[i].dt_txt),
                'temp': Math.round(response.list[i].main.temp),
                'desc': formatUtils.capitalizeFirstLetters(response.list[i].weather[0].description),
                'weatherType': response.list[i].weather[0].main,
                'weatherIcon': response.list[i].weather[0].icon,
                'minTemp': Math.floor(response.list[i].main.temp_min),
                'maxTemp': Math.ceil(response.list[i].main.temp_max),
                'Kalmanfilter': response.list[i].main.temp_kf,
                'humidity': response.list[i].main.humidity,
                'wind-speed': response.list[i].wind.speed,
                'wind-deg': response.list[i].wind.deg,
                'wind-dir': formatUtils.getWindDirection(response.list[i].wind.deg),
                'pop': response.list[i].pop,
                'rain': response.list[i].rain? response.list[i].rain['3h'] : 0,
                'snow': response.list[i].snow? response.list[i].snow['3h'] : 0,                
                'pressure': response.list[i].main.pressure,
                'clouds': response.list[i].clouds.all,
                'part-of-the-day': response.list[i].sys.pod == 'd' ? 'Jour' : 'Nuit',
                'period-of-the-day': formatUtils.getPeriod(response.list[i].dt),
                // 'uvi': response.list[i].main.uvi,
                'feelsLike': Math.round(response.list[i].main.feels_like),
                'grndLevel': response.list[i].main.grnd_level,
                'seaLevel': response.list[i].main.sea_level,
                'visibility': response.list[i].visibility,
                'windChill': formatUtils.calculateWindChill(response.list[i].main.temp, response.list[i].wind.speed),
                'dewPoint': formatUtils.calculateWindChill(response.list[i].main.temp, response.list[i].main.humidity),
                'uvi': formatUtils.calculateUVI(response.city.coord.lat, 1500, parseInt(response.list[i].dt_txt.split(' ')[1].split(':')[0]), response.list[i].clouds.all)
            });
        }
        
        for (let i = 0; i < response.list.length; i++) {
            if (currDt === response.list[i].dt_txt.slice(8, 10)) continue;
            currDt = response.list[i].dt_txt.slice(8, 10);
            next5Days.push({
                'time': formatUtils.getDisplayTime(response.list[i].dt_txt),

                'day': formatUtils.getDay(response.list[i].dt_txt).slice(0, 3),
                'date': formatUtils.getShortDate(response.list[i].dt_txt),
                'desc': formatUtils.capitalizeFirstLetters(response.list[i].weather[0].description),
                'weatherType': response.list[i].weather[0].main,
                'weatherIcon': response.list[i].weather[0].icon,
                'minTemp': Math.floor(response.list[i].main.temp_min),
                'maxTemp': Math.ceil(response.list[i].main.temp_max),
                'Kalmanfilter': response.list[i].main.temp_kf,
                'humidity': response.list[i].main.humidity,
                'wind-speed': response.list[i].wind.speed,
                'wind-deg': response.list[i].wind.deg,
                'wind-dir': formatUtils.getWindDirection(response.list[i].wind.deg),
                'pop': response.list[i].pop,
                'rain': response.list[i].rain? response.list[i].rain['3h'] : 0,
                'snow': response.list[i].snow? response.list[i].snow['3h'] : 0,
                'pressure': response.list[i].main.pressure,
                'clouds': response.list[i].clouds.all,
                'part-of-the-day': response.list[i].sys.pod == 'd' ? 'Jour' : 'Nuit',
                'period-of-the-day': formatUtils.getPeriod(response.list[i].dt),
                // 'uvi': response.list[i].main.uvi,
                'feelsLike': Math.round(response.list[i].main.feels_like),
                'grndLevel': response.list[i].main.grnd_level,
                'seaLevel': response.list[i].main.sea_level,
                'visibility': response.list[i].visibility,
                'windChill': formatUtils.calculateWindChill(response.list[i].main.temp, response.list[i].wind.speed),
                'dewPoint': formatUtils.calculateWindChill(response.list[i].main.temp, response.list[i].main.humidity),
                'uvi': formatUtils.calculateUVI(response.city.coord.lat, 1500, response.list[i].dt_txt.split(' ')[1].split(':')[0], response.list[i].clouds.all)
            });
        }

        const Data = {
            'location': {
                'date': formatUtils.getformattedTodayDate(),
                'cityName': response.city.name,
                'country': response.city.country,
                'population': response.city.population,
                'timezone': response.city.timezone,
                'latitude': response.city.coord.lat,
                'longitude': response.city.coord.lon
            },
            'currentWeather': {
                'temperature': Math.round(response.list[0].main.temp),
                'desciption': formatUtils.capitalizeFirstLetters(response.list[0].weather[0].description),
                'weatherType': response.list[0].weather[0].main,
                'minTemp': Math.floor(response.list[0].main.temp_min),
                'maxTemp': Math.ceil(response.list[0].main.temp_max),
                'wind-speed': response.list[0].wind.speed,
                'wind-deg': response.list[0].wind.deg,
                'wind-dir': formatUtils.getWindDirection(response.list[0].wind.deg),
                'pressure': response.list[0].main.pressure,
                'rain': response.list[0].rain? response.list[0].rain['3h'] : 0,
                'humidity': response.list[0].main.humidity,
                'sunrise': formatUtils.getTimeFromTimeStamp(response.city.sunrise),
                'sunset': formatUtils.getTimeFromTimeStamp(response.city.sunset)
            },
            'byHour': byHour,
            'next5Days': next5Days
        };
        console.log(Data)
        // setWeatherData(Data);
        
    return (

        <div className="container" >
            <div className="mainContainer">
                <h1>Weather Application data</h1>
                <WeatherAPP weatherData={weatherData} />
            </div>
        </div>
    );
}