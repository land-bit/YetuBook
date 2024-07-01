

import React from 'react';

function Previsions({ weatherData }) {
  const getTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Adjust for AM/PM based on hours
    const time = hours >= 12 ? `${hours - 12}:${minutes} PM` : `${hours}:${minutes} AM`;
    return time;
  };

  const getWeatherDescription = (weather) => {
    if (weather.length > 0) {
      return weather[0].description;
    }
    return 'NA';
  };

  const getWindDirection = (deg) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const val = Math.floor((deg / 22.5) + 0.5);
    return directions[val % 16];
  };

  const getPeriod = (timestamp) => {
    const hours = new Date(timestamp * 1000).getHours();
    if (hours >= 0 && hours < 6) {
      return 'Nuit';
    } else if (hours >= 6 && hours < 12) {
      return 'Matin';
    } else if (hours >= 12 && hours < 18) {
      return 'Après-midi';
    } else {
      return 'Soir';
    }
  };

  const getAverage = (data, property) => {
    const sum = data.reduce((acc, curr) => acc + curr.main[property], 0);
    return (sum / data.length).toFixed(1);
  };

  const middleIndex = Math.floor(weatherData.length / 2);
  const middleWeather = weatherData[middleIndex];

  return (
    <div className="weather-card">
      <div className="card-header">
        <h2>{getPeriod(middleWeather.dt)}</h2>
        <img
          src={`http://openweathermap.org/img/wn/${middleWeather.weather[0].icon}@2x.png`}
          alt={getWeatherDescription(middleWeather.weather)}
        />
        <p>{getWeatherDescription(middleWeather.weather)}</p>
      </div>
      <div className="card-body">
        <p>
          {getTimeFromTimestamp(middleWeather.dt)}: {middleWeather.main.temp.toFixed(1)}°C
        </p>
        <ul>
          <li>Moyenne des températures: {getAverage(weatherData, 'temp')}°C</li>
          <li>Taux de pluie moyen: {getAverage(weatherData.filter((item) => item.rain), '3h')} mm</li>
          <li>Vitesse moyenne du vent: {getAverage(weatherData, 'speed')} m/s</li>
          <li>Direction du vent à {getTimeFromTimestamp(middleWeather.dt)}: {getWindDirection(middleWeather.wind.deg)}</li>
          <li>Humidité moyenne: {getAverage(weatherData, 'humidity')} %</li>
        </ul>
      </div>
    </div>
  );
}

export default Previsions;