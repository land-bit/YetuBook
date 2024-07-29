import React from 'react';

export function PrevisionsCard({ weatherData }) {

  const getTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');


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


  
  const getDayOfWeek = (timestamp) => {
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const dayIndex = new Date(timestamp * 1000).getDay();
    return daysOfWeek[dayIndex];
  };

  const getAverage = (data, property) => {
    const sum = data.reduce((acc, curr) => acc + curr.main[property], 0);
    return (sum / data.length).toFixed(1);
  };

  const getAverageTemperature = (data, property) => {
    const sum = data.reduce((acc, curr) => acc + curr.main[property], 0);
    return (sum / data.length).toFixed(1);
  };



  const getAveragePrecipitation = (data, property) => {
    const sum = data.reduce((acc, curr) => {
      const value = curr.rain !== undefined ? curr.rain[property] : 0;
      return acc + value;
    }, 0);
    return (sum / data.length).toFixed(1);
  };

  const getAverageSpeed = (data, property) => {
    const sum = data.reduce((acc, curr) => acc + curr.wind[property], 0);
    return (sum / data.length).toFixed(1);
  };

  const middleIndex = Math.floor(weatherData.length / 2);
  const middleWeather = weatherData[middleIndex];

  return (
    <div className="weather-card">
      <div className="card-header">
        <h2>{getPeriod(middleWeather.dt)}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${middleWeather.weather[0].icon}@2x.png`}
          alt={getWeatherDescription(middleWeather.weather)}
          style={{width: "45px"}}
        />
        <p>{getWeatherDescription(middleWeather.weather)}</p>
      </div>
      <div className="card-body">
        <p>
          {getTimeFromTimestamp(middleWeather.dt)}: {middleWeather.main.temp.toFixed(1)}°C
        </p>
        <ul>
          <li>Moyenne des températures: {getAverageTemperature(weatherData, 'temp')}°C</li>
          {/* <li>Taux de pluie moyen: {getAverage(weatherData.filter((item) => item.rain), '3h')} mm</li> */}
          <li>Précipitation moyenne: {getAveragePrecipitation(weatherData, '3h')} mm</li>          
          <li>Vitesse moyenne du vent: {getAverageSpeed(weatherData, 'speed')} m/s</li>
          <li>Direction du vent à {getTimeFromTimestamp(middleWeather.dt)}: {getWindDirection(middleWeather.wind.deg)}</li>
          <li>Humidité moyenne: {getAverage(weatherData, 'humidity')} %</li>
        </ul>
      </div>
    </div>
  );
}


const WeatherForecast = ({ weatherData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date et Heure</th>
          <th>Prévision</th>
          <th>Température (°C)</th>
          <th>Description</th>
          <th>Vitesse du Vent (m/s)</th>
          <th>Probabilité de Pluie (%)</th>
        </tr>
      </thead>
      <tbody>
        {weatherData.map(item => (
          <tr key={item.dt}>
            <td>{item.dt_txt}</td>
            <td>{`Conditions météorologiques: feels like ${item.main.feels_like}, grnd level ${item.main.grnd_level}, humidité ${item.main.humidity}%, pression atmo: ${item.main.pressure} hPa, sea level ${item.main.sea_level}, température ${item.main.temp}°C, température maximal${item.main.temp_max}, température minimal${item.main.temp_min}. Descrpition: ${item.weather[0].description}`}</td>
            <td>{item.main.temp}</td>
            <td>{item.weather[0].description}</td>
            <td>{item.wind.speed}</td>
            <td>{item.pop}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeatherForecast;
