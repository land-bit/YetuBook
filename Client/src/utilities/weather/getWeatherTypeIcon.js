
const getWeatherTypeIcon = (weatherType) => {
    if (weatherType === 'Thunderstorm') return 'wi-thunderstorm';
    if (weatherType === 'Drizzle') return 'wi-sprinkle';
    if (weatherType === 'Rain') return 'wi-rain';
    if (weatherType === 'Snow') return 'wi-snow';
    if (weatherType === 'Mist') return 'wi-smog';
    if (weatherType === 'Smoke') return 'wi-smoke';
    if (weatherType === 'Haze') return 'wi-day-haze';
    if (weatherType === 'Dust') return 'wi-dust';
    if (weatherType === 'Fog') return 'wi-fog';
    if (weatherType === 'Sand') return 'wi-sandstorm';
    if (weatherType === 'Tornado') return 'wi-tornado';
    if (weatherType === 'Clear') return 'wi-day-sunny';
    if (weatherType === 'Clouds') return 'wi-cloudy';
    return 'wi-na';
};

export default getWeatherTypeIcon;