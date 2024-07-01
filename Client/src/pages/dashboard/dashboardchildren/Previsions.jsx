import React from 'react';
import dataPrevisions from '../previsiondataexemple';

function Previsions({ weatherData = dataPrevisions }) {

  const data = dataPrevisions.list;
  const firstTenItems = data.slice(0, 10);
  // Map each item object to a string representation and join them together
  const itemsData = firstTenItems.map(item => {
    return `Prévision pour ${item.dt_txt}: Conditions météorologiques: feels like ${item.main.feels_like}, grnd level ${item.main.grnd_level}, humidité${item.main.humidity}%, pression${item.main.pressure} hPa, sea level ${item.main.sea_level}, température ${item.main.temp}°C, température maximal${item.main.temp_max}, température minimal${item.main.temp_min}. Descrpition: ${item.weather[0].description}, Vent : ${item.wind}, Probabilité de pluie${item.pop}% de chance de pluie`;
  });
  console.log(firstTenItems)
  // Combine the prompt with the data to generate a new text response
  const prompt = `${promptInput} voici les données des prévisions pour ma région à traiter: ${itemsData.join('\n')}`;


  const getTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Adjust for AM/PM based on hours
    // const time = hours >= 12 ? `${hours - 12}:${minutes} PM` : `${hours}:${minutes} AM`;
    // return time;
    return hours + "H" + minutes
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
      return 'Journée';
    } else {
      return 'Soir';
    }
  };

  function Previsions(weatherData) {
    // Où weatherData est le tableau d'objet contenant chaque heure
    const data = weatherData;
    const firstTenItems = data;
    // Map each item object to a string representation and join them together
    const itemsData = firstTenItems.map(item => {
      return `Prévision pour ${item.dt_txt}: Conditions météorologiques: feels like ${item.main.feels_like}, grnd level ${item.main.grnd_level}, humidité ${item.main.humidity}%, pression atmo: ${item.main.pressure} hPa, sea level ${item.main.sea_level}, température ${item.main.temp}°C, température maximal${item.main.temp_max}, température minimal${item.main.temp_min}. Descrpition: ${item.weather[0].description}, Vitesse du Vent : ${item.wind.speed} m/s, l'ortientation du vent ${item.wind.deg}, Probabilité de pluie ${item.pop}% de chance de pluie`;
    });
    console.log(itemsData.join('\n'))
    // Combine the prompt with the data to generate a new text response
    // const prompt = `${promptInput} voici les données des prévisions pour ma région à traiter: ${itemsData.join('\n')}`;
  }
  
  const getDayOfWeek = (timestamp) => {
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const dayIndex = new Date(timestamp * 1000).getDay();
    return daysOfWeek[dayIndex];
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

