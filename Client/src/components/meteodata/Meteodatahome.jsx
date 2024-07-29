import React, { useState, useEffect, useRef } from 'react';
import './meteodatahome.css'
import navigation from "../../assets/icon/meteodescfigma/navigation.png"
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import { Tooltip } from 'react-leaflet';
import showMeteoDetails from '../popup/showMeteoDetails/showMeteoDetails';
import getGoodFormatWeatherData from '../../utilities/weather/getGoodFormatWeatherData';
import FormatUtils from '../../utilities/weather/getFormat';
import getCurrentWeather from '../../utilities/weather/getCurrentWeather';
const formatUtils = new FormatUtils();


const MeteodataHome = () => {

    const [previsionWeatherdata, setWeatherData] = useState(null);
    const [currentWeatherdata, setCurrentWeatherdata] = useState();
    const [error, setError] = useState(null)
    const [heure, setHeure] = useState(new Date().toLocaleTimeString());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClimateData = async () => {
            try {
                const previsiondata = await getGoodFormatWeatherData();
                const currentWeather = await getCurrentWeather();
                setWeatherData(previsiondata)
                setCurrentWeatherdata(currentWeather)

            } catch (error) {
                console.error(error);
                setError(error);
            }
        }
        fetchClimateData();

        const time = new FormatUtils().getFormattedTodayHour();
        setHeure(time);

        // Simuler le chargement pendant 2 minutes  
        const timer = setTimeout(() => {
            setLoading(false); // Arrêter le chargement après 2 minutes  
        }, 240000); // 120000 ms = 2 minutes  
        return () => clearTimeout(timer); // Nettoyer le timer au démontage du composant
    }, []);

    const [temp, setTemp] = useState(1);

    if (!previsionWeatherdata && loading) {
        return (
            <div className='skelleton-meteo'>
                <h1 className='logo-dashboard'>MétéoWatch</h1>
                <div className='chargement-message'>Chargement des données météorologiques...</div>
                <div className="loading-spinner"></div>
            </div>
        );
    }



    if (!previsionWeatherdata && !loading) {
        return (
            <>
                <div className='skelleton-meteo'>
                    <small>{error}</small>
                    <h1 className='logo-dashboard'>MétéoWatch</h1>
                    <small>Nous n'arrivons pas à accéder à vos coordonnées géographiques pour fournir les données météorologiques de votre zone. Veuillez autoriser l'application à accéder à votre localisation.</small>
                </div>
            </>
        )
    }

    console.log(previsionWeatherdata)
    // console.log(currentWeatherdata)

    const graphData = [
        {
            temperature: previsionWeatherdata.byHour[0].temp,
            time: previsionWeatherdata.byHour[0].time,
            chanceOfrain: previsionWeatherdata.byHour[0].pop * 100
        },
        {
            temperature: previsionWeatherdata.byHour[1].temp,
            time: previsionWeatherdata.byHour[1].time,
            chanceOfrain: previsionWeatherdata.byHour[1].pop * 100
        },
        {
            temperature: previsionWeatherdata.byHour[2].temp,
            time: previsionWeatherdata.byHour[2].time,
            chanceOfrain: previsionWeatherdata.byHour[2].pop * 100
        },
        {
            temperature: previsionWeatherdata.byHour[3].temp,
            time: previsionWeatherdata.byHour[3].time,
            chanceOfrain: previsionWeatherdata.byHour[3].pop * 100
        },
        {
            temperature: previsionWeatherdata.byHour[4].temp,
            time: previsionWeatherdata.byHour[4].time,
            chanceOfrain: previsionWeatherdata.byHour[4].pop * 100
        },
        {
            temperature: previsionWeatherdata.byHour[5].temp,
            time: previsionWeatherdata.byHour[5].time,
            chanceOfrain: previsionWeatherdata.byHour[5].pop * 100
        }
    ]


    return (
        <div className='meteo-data-home'>
            <div className='meteo-data-home-content'>
                <div className='meteo-data-content-title'>
                    <h3 style={{ color: "white" }}>{previsionWeatherdata.location.cityName} <small> {previsionWeatherdata.location.date}</small></h3>
                    <p><small>Dernière mise à jour :</small> <span style={{ color: 'white' }}>{heure}</span></p>
                </div>
                <div>
                    <small style={{ color: 'white', fontStyle: 'Italic' }}> Aujourd'hui le soleil se lève à {previsionWeatherdata.currentHour.sunrise} et se couche à {previsionWeatherdata.currentHour.sunset}.</small>
                </div>
                <small>Il y a {previsionWeatherdata.currentHour.pop * 100} % de chance qu'il pleuve à l'heure actuelle.</small>

                <img src={`https://openweathermap.org/img/wn/${currentWeatherdata.weather[0].icon}@2x.png`} alt='' />

                <p style={{ color: 'white' }}>{formatUtils.capitalizeFirstLetters(currentWeatherdata.weather[0].description)}</p>
            
                <h1 >{Math.round(currentWeatherdata.main.temp)}°</h1>

                <div className='meteo-data-home-graph'>
                    <div style={{ height: "85px", paddingTop: "10px" }} className='meteo-data-home-graph-temp'>
                        <small style={{ color: 'white', position: 'absolute', left: '0', top: '-15px', width: '100%', zIndex: '-5' }}>Température</small>
                        <LineChart width={320} height={80} data={graphData}>
                            {/* <XAxis dataKey="time" /> */}
                            {/* <YAxis yAxisId="left" unit="°C" /> */}
                            <Tooltip />
                            <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="white" />
                        </LineChart>
                    </div>
                    <div style={{ height: "85px", paddingTop: "10px" }} className='meteo-data-home-graph-chanceOfrain'>
                        <small style={{ color: '#2F5AF4', position: 'absolute', left: '0', top: '0px', width: '100%', zIndex: '-5' }}>Chance de pluie</small>
                        <LineChart width={320} height={80} data={graphData}>
                            <XAxis dataKey="time" />
                            {/* <YAxis yAxisId="left" unit="°C" /> */}
                            {/* <YAxis yAxisId="right" unit="%" /> */}
                            <Tooltip />
                            <Line yAxisId="right" type="monotone" dataKey="chanceOfrain" stroke="#2F5AF4" />
                        </LineChart>
                    </div>
                </div>

                <div className='meteo-data-home-forcast'>
                    {
                        previsionWeatherdata.byHour.map((item, index) => {
                            // Assurez-vous que nous ne sommes pas à la dernière itération  
                            if (index < previsionWeatherdata.byHour.length - 1) {
                                // Vérifiez si le period-of-the-day de l'item courant est égal à celui du prochain item  
                                if (item['period-of-the-day'] === previsionWeatherdata.byHour[index + 1]['period-of-the-day']) {
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
                                        >{Math.round(item.pop * 100)}%</span>
                                    </h3>
                                    <small style={{ color: 'white' }}>
                                        {item['period-of-the-day'] === 'Journée' || item['period-of-the-day'] == 'Nuit' && parseInt(item['date'].split('/')[0], 10) === new Date().getDate()
                                            ? 'La' + ' ' + item['period-of-the-day']
                                            : item['period-of-the-day'] == 'Matin' || item['period-of-the-day'] == 'Soir' && parseInt(item['date'].split('/')[0], 10) === new Date().getDate()
                                                ? 'Le' + ' ' + item['period-of-the-day']
                                                : parseInt(item['date'].split('/')[0], 10) > new Date().getDate()
                                                    ? 'Cette' + ' ' + item['period-of-the-day']
                                                    : ''}
                                    </small>
                                    <small>{item['day']} {item['date']}</small>
                                    <img src={`https://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`} alt="" />
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
                        previsionWeatherdata.next5Days[0].pop * 100 < 30
                            ? 'm-d-h-f-see-more'
                            : previsionWeatherdata.next5Days[0].pop * 100 < 70 && previsionWeatherdata.next5Days[0].pop * 100 >= 30
                                ? 'm-d-h-f-see-more-jaune'
                                : 'm-d-h-f-see-more-rouge'
                    }
                    onClick={showMeteoDetails}
                >La chance de pluie pour {previsionWeatherdata.next5Days[0].day} {previsionWeatherdata.next5Days[0].date} à {previsionWeatherdata.next5Days[0].time} est de <strong>{previsionWeatherdata.next5Days[0].pop * 100} %.</strong></button>

            </div>
        </div>
    );
};

export default MeteodataHome;







