import React, { useState, useEffect, useRef } from 'react';
import './meteodatahome.css'
import navigation from "../../assets/icon/meteodescfigma/navigation.png"
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import { Tooltip } from 'react-leaflet';
import showMeteoDetails from '../popup/showMeteoDetails/showMeteoDetails';
import getGoodFormatWeatherData from '../../utilities/weather/getGoodFormatWeatherData';
import FormatUtils from '../../utilities/weather/getFormat';

const MeteodataHome = () => {

    const [weatherData, setWeatherData] = useState(null);
    const [heure, setHeure] = useState(new Date().toLocaleTimeString());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClimateData = async () => {
            try {
                const data = await getGoodFormatWeatherData();
                setWeatherData(data)

            } catch (error) {
                console.error(error);
            }
        }
        fetchClimateData();

        const time = new FormatUtils().getformattedTodayHour();
        setHeure(time);

        // Simuler le chargement pendant 2 minutes  
        const timer = setTimeout(() => {
            setLoading(false); // Arrêter le chargement après 2 minutes  
        }, 10000); // 120000 ms = 2 minutes  
        return () => clearTimeout(timer); // Nettoyer le timer au démontage du composant
    }, []);

    const [temp, setTemp] = useState(1);

    if (!weatherData && loading) {
        return (
            <div className='skelleton-meteo'>
                <div className='chargement-message'>Chargement...</div>
                <div className="loading-spinner"></div>
                <div class="chance-rain-loading">
                    <div>
                        <span className="percentage" >{temp < 100 && temp >0 ? setTimeout(()=>{setTemp(temp+1)},1000): setTemp(temp=100)}%</span>
                    </div>
                    <div className="progresse-bar-loading" >
                        <div className="progresse-bar-child-loading" style={{ width: `${temp < 100 && temp >0 ? setTimeout(()=>{setTemp(temp+1)},1000): setTemp(temp=100)}%` }}></div>
                    </div>
                </div>
            </div>
        );
    }



    if (!weatherData && !loading) {
        return (
            <>
                <div className='skelleton-meteo'>
                    <h1 className='logo-dashboard'>MétéoWatch</h1>
                    <small>Nous n'arrivons pas à accéder à vos coordonnées géographiques pour fournir les données météorologiques de votre zone. Si ce n'est pas un problème de connexion veuillez entrer le nom de votre ville.</small>
                    <form action="" className='search-nom-de-ville'>
                        <input type="text" name="" id="" placeholder='Entrez votre ville' />
                        <button type="submit">Get data</button>
                    </form>
                </div>
            </>
        )
    }
    const graphData = [
        {
            temperature: weatherData.byHour[0].temp,
            time: weatherData.byHour[0].time,
            chanceOfrain: weatherData.byHour[0].pop * 100
        },
        {
            temperature: weatherData.byHour[1].temp,
            time: weatherData.byHour[1].time,
            chanceOfrain: weatherData.byHour[1].pop * 100
        },
        {
            temperature: weatherData.byHour[2].temp,
            time: weatherData.byHour[2].time,
            chanceOfrain: weatherData.byHour[2].pop * 100
        },
        {
            temperature: weatherData.byHour[3].temp,
            time: weatherData.byHour[3].time,
            chanceOfrain: weatherData.byHour[3].pop * 100
        },
        {
            temperature: weatherData.byHour[4].temp,
            time: weatherData.byHour[4].time,
            chanceOfrain: weatherData.byHour[4].pop * 100
        },
        {
            temperature: weatherData.byHour[5].temp,
            time: weatherData.byHour[5].time,
            chanceOfrain: weatherData.byHour[5].pop * 100
        }
    ]


    return (
        <div className='meteo-data-home'>
            <div className='meteo-data-home-content'>
                <div className='meteo-data-content-title'>
                    <h3 style={{ color: "white" }}>{weatherData.location.cityName} <small> {weatherData.location.date}</small></h3>
                    <p><small>Dernière mise à jour :</small> <span style={{color: 'white'}}>{heure}</span></p>
                </div>
                <div>
                    <small style={{ color: 'white', fontStyle: 'Italic' }}> Aujourd'hui le soleil se lève à {weatherData.currentWeather.sunrise} et se couche à {weatherData.currentWeather.sunset}.</small>
                </div>
                <img src={`http://openweathermap.org/img/wn/${weatherData.currentWeather.weatherIcon}@2x.png`} alt='' />

                <p style={{ color: 'white' }}>{weatherData.currentWeather.desciption}</p>
                <h1 >{weatherData.currentWeather.temperature}°</h1>

                <div className='meteo-data-home-graph'>
                    <div style={{ height: "85px", paddingTop: "10px" }} className='meteo-data-home-graph-temp'>
                        <small style={{ color: 'white', position: 'absolute', left: '0', top: '-15px', width: '100%', zIndex: '-5' }}>Température</small>
                        <LineChart width={320} height={100} data={graphData}>
                            {/* <XAxis dataKey="time" /> */}
                            {/* <YAxis yAxisId="left" unit="°C" /> */}
                            <Tooltip />
                            <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="white" />
                        </LineChart>
                    </div>
                    <div style={{ height: "85px", paddingTop: "10px" }} className='meteo-data-home-graph-chanceOfrain'>
                        <small style={{ color: '#2F5AF4', position: 'absolute', left: '0', top: '0px', width: '100%', zIndex: '-5' }}>Chance de pluie</small>
                        <LineChart width={320} height={50} data={graphData}>
                            {/* <XAxis dataKey="time" /> */}
                            {/* <YAxis yAxisId="left" unit="°C" /> */}
                            {/* <YAxis yAxisId="right" unit="%" /> */}
                            <Tooltip />
                            <Line yAxisId="right" type="monotone" dataKey="chanceOfrain" stroke="#2F5AF4" />
                        </LineChart>
                    </div>
                </div>

                <div className='meteo-data-home-forcast'>
                    {
                        weatherData.byHour.map((item, index) => {
                            // Assurez-vous que nous ne sommes pas à la dernière itération  
                            if (index < weatherData.byHour.length - 1) {
                                // Vérifiez si le period-of-the-day de l'item courant est égal à celui du prochain item  
                                if (item['period-of-the-day'] === weatherData.byHour[index + 1]['period-of-the-day']) {
                                    return null; // Ne rien retourner si la condition est remplie  
                                }
                            }

                            // Si la condition n'est pas remplie, nous retournons l'élément habituel  
                            return (
                                <div className='m-d-h-f-content' key={index}>
                                    <h3>{item.time}
                                        <span className='lampe-temoine-pluie'
                                            style={item.pop * 100 < 30
                                                ? { backgroundColor: "#44a73b" }
                                                : item.pop * 100 < 70 && item.pop * 100 >= 30
                                                    ? { backgroundColor: 'var(--color-primary)' }
                                                    : { backgroundColor: "red" }}
                                        >{item.pop * 100}%</span>
                                    </h3>
                                    <small style={{ color: 'white' }}>
                                        {item['period-of-the-day'] === 'Journée' || item['period-of-the-day'] == 'Nuit' && parseInt(item['date'].split('/')[0], 10) === new Date().getDate()
                                            ? 'Cette' + ' ' + item['period-of-the-day']
                                            : item['period-of-the-day'] == 'Matin' || item['period-of-the-day'] == 'Soir' && parseInt(item['date'].split('/')[0], 10) === new Date().getDate()
                                                ? 'Ce' + ' ' + item['period-of-the-day']
                                                : parseInt(item['date'].split('/')[0], 10) > new Date().getDate()
                                                    ? 'Demain' + ' ' + item['period-of-the-day']
                                                    : 'Ce' + ' ' + item['period-of-the-day']}
                                    </small>
                                    <img src={`http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`} alt="" />
                                    <small style={{ color: 'var(--color-primary)' }}>{item.desc}</small>
                                    <h4>{item.temp}°</h4>
                                    <img style={{ width: '20px', rotate: `${item['wind-deg']}deg` }} src={navigation} alt="" />
                                    <p>{Math.round(item['wind-speed'] * 3600 / 1000)}Km/h</p>
                                </div>
                            )
                        })}

                </div>
                <button 
                className={
                    weatherData.next5Days[0].pop < 30 
                    ?'m-d-h-f-see-more'
                    :weatherData.next5Days[0].pop < 70 && weatherData.next5Days[0].pop >= 30
                    ?'m-d-h-f-see-more-jaune'
                    :'m-d-h-f-see-more-rouge'
                    } 
                    onClick={showMeteoDetails}
                    >La chance de pluie pour {weatherData.next5Days[0].day} {weatherData.next5Days[0].date} à {weatherData.next5Days[0].time} est de <strong>{weatherData.next5Days[0].pop * 100} %.</strong></button>

            </div>
        </div>
    );
};

export default MeteodataHome;







