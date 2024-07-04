import React, { useState, useEffect, useRef } from 'react';
import './meteodata.css'
import getCurrentWeather from './getCurrentWeather';
import getPrevisionMeteo from './getPrevisionMeteo';
import HumidityGauge from './HumidityGauge';
import PressionAtmospherique from './PressionAtmospherique';
import Speedometre from './Speedometre';
import Temperature from './Temperature';
import CartInteractive from './CarteInteractive';
import Boussole from './Boussole';
import Horloge from './Horloge';
import HorlogeNumerique from './HorlogeNumerique';
import getAirPollution from './getAirPollution';
import GraphAirPollution from './GraphAirPollution';
import AirPollutionGauge from './AirPollutionGauge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPager, faPaperPlane, faSeedling } from '@fortawesome/free-solid-svg-icons';
import MeteodataHome from './Meteodatahome';
import showChat from '../popup/showChat';

const Meteodata = () => {
  const [climateData, setClimateData] = useState([]);
  const [airpollutionData, setAirPelluionData] = useState([])
  const [currentWeather, setCurrentWeather] = useState(null);
  const [lastTemperature, setLastTemperature] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const intervalRef = useRef(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


  useEffect(() => {
    const fetchClimateData = async () => {

      // Obtenons les données météorologique actuelles sur base des coordonnées de l'utilisateur
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);


          try {
            const response = await getCurrentWeather(position.coords.longitude, position.coords.latitude);
            const airpollution = await getAirPollution(position.coords.longitude, position.coords.latitude)
            const previsionMeteo = await getPrevisionMeteo(position.coords.longitude, position.coords.latitude)
            console.log(response.data.main)
            // console.log(airpollution.data.list[0].components)
            console.log(previsionMeteo.data.list)

            const newEntry = {
              time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
              temperature: response.data.main.temp,
              precipitation: response.data.rain?.['1h'] || 0
            };

            if (airpollution?.data.list[0].components !== undefined) {
              const newEntryAirPollution = {
                time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                co: airpollution.data.list[0].components.co,
                nh3: airpollution.data.list[0].components.nh3,
                no: airpollution.data.list[0].components.no,
                no2: airpollution.data.list[0].components.no2,
                o3: airpollution.data.list[0].components.pm2_5,
                pm10: airpollution.data.list[0].components.pm10,
                so2: airpollution.data.list[0].components.so2
              };
              setAirPelluionData([newEntryAirPollution]);
            }

            setClimateData(prevData => [...prevData, newEntry]);



            setCurrentWeather(response.data);
            setTimestamp(new Date().toLocaleString('fr-FR'));
            if (climateData.length > 0) {
              setLastTemperature(climateData[climateData.length - 1].temperature);
            }
          } catch (error) {
            console.error(error);
          }
        }, (error) => {
          console.error(error.message);
        });
      } else {
        console.error('La géolocalisation n\'est pas disponible');
      }

    };

    fetchClimateData();

    intervalRef.current = setInterval(fetchClimateData, 1000 * 60 * 15);//une réquête toutes les 15 minutes

    return () => clearInterval(intervalRef.current);

  }, []);

  if (!currentWeather) {
    return <div className='skelleton-meteo'>
      <div className='chargement-message'>Chargement...</div>
      <div className="loading-spinner"></div>
    </div>
  }
  // affichons un indicateur visuel de la tendance de la température
  //calculons la tendance de la température en comparant la température actuelle à la température précédente
  const temperatureTrend = lastTemperature !== null
    ? currentWeather.main.temp > lastTemperature
      ? '⏫'
      : currentWeather.main.temp < lastTemperature
        ? '⏬'
        : '⏩'
    : '⏹';

  return (
    <div className='meteo-contenair'>
      <div className='meteo-entete-date'>

        <div className='meteo-date'>
          <h3 className='obervatoire'>MétéoWatch</h3>
          <HorlogeNumerique />
        </div>
        <div className='meteo-entete'>
          <div className='meteo-titre'>Données Météorologiques en temps réel pour: <strong>{currentWeather.name}</strong></div>
          <small>Dernière mise à jour: {timestamp}</small>
        </div>
      </div>
      <div className='meteo-info'>
        <div className='temperature-description'>
          <div>
            <div className='temperature'>{Math.floor(currentWeather.main.temp)}°C <small className='fleche'>{temperatureTrend}</small></div>
            <p>Précipitation: {currentWeather.rain?.['1h'] || 0} mm</p>
            <p>Pression atm: {currentWeather.main.pressure} hPa</p>
          </div>
          <div className='horloge-analogique'>
            {/* <Horloge /> */}
          </div>

          <div>
            <img style={{ width: "5rem" }} src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="Conditions météo" />
            <p>{currentWeather.weather[0].description}</p>
          </div>
        </div>
      </div>
      <br />
      <p><strong>Pleuvra-t-il aujourd'hui à <strong>{currentWeather.name}</strong> ? <FontAwesomeIcon icon={faPaperPlane} /></strong></p>
      <p><strong>Quel sera le temps à <strong>{currentWeather.name}</strong> demain ? <FontAwesomeIcon icon={faPaperPlane} /></strong></p>
      <br />
      <div className='discuter-avec-meteo btn-red' onClick={showChat}>Discuter avec la météo...</div>
      <br />

      <p><strong>Capteur de température et d'humidité :</strong></p>
      <br />
      <div className='temp-humid-contener'>

        <div className='gauge-temperature'>
          <Temperature temperature={currentWeather.main.temp} />
        </div>

        <div className='gauge-humitiy'>
          <HumidityGauge humidity={currentWeather.main.humidity} />
        </div>

      </div>

      <br />
      <p><strong>Vitesse du vent et son orientation:</strong></p>
      <br />
      <div className='speedometre-vent'>

        <div style={{ width: '250px' }}>
          <Speedometre vitesse={currentWeather.wind.speed * 3600 / 1000} />
        </div>
        <div className='boussole-contener'>
          <Boussole direction={currentWeather.wind.deg} />
        </div>
      </div>
      <br />
      <p><strong>Pression atmospherique :</strong></p>
      <br />

      <div className='pression-atmospherique'>
        <div className='pression-gauge'>
          <PressionAtmospherique pression={currentWeather.main.pressure} />
        </div>

        <div className="speedo-boussole-pression-text">
          <small>(%) : Ici la pression atmospherique est expriée en pourcentage. La valeur minimale: 870hPa et la valeur maximale: 1050hPa</small>
        </div>

      </div>

      <br />
      <p><strong>Qualité de l'air et concentration de <a href="#">polluants dans dans l'air: </a></strong></p>
      <br />

      {/* <div>
        <GraphiqueCourbes data={climateData} />
      </div> */}

      <div className="air-quality">

        <div className='air-pollution-gauge'>
          <AirPollutionGauge airQualityIndice={55} />
          <small>Indice de Qualité de l'Air</small>
        </div>

        <br />

        {airpollutionData ?
          (<div className='graph-air-pollution'>
            <GraphAirPollution data={airpollutionData} />
            <small>Les polluants de l'air</small>
          </div>) : (<p>Les données sur la pollution n'es sont pas disponible pour le moment</p>)

        }


      </div>
      <br />

      <div className='carte-interactive'>
        <CartInteractive longitude={longitude} latitude={latitude} />
      </div>
      <br />

      <div className="buletin-meteo">
        <h3>QUESTIONS FREQUEMMENT POSÉES SUR LA MÉTÉO</h3>
        <h5>PLEUVRA-T-IL AUJOURD'HUI À GOMA ?</h5>
        <p>84% de chances de pluie ce matin <br />
          100% de chances de pluie cet après-midi<br />
          100% de chances de pluie ce soir<br />
          89% de chances de pluie cette nuit<br /></p>
        <p>LE TEMPS CE MATIN À GOMA
          Ce matin à Goma, il pleuvra beaucoup. La température à Goma ce matin sera de 15°C . La force du vent oscillera aux alentours des 5 km/h (orientation du vent : Est-Sud-Est). L'humidité relative de l'air sera de 76%.

          LE TEMPS POUR CET APRÈS-MIDI À GOMA
          Dans l'après midi à Goma, la pluie sera au rendez-vous. La température cet après-midi pour Goma atteindra les 24°C (ressentie 25°C). Le vent devrait atteindre en moyenne les 9 km/h (orientation du vent : Sud).

          LE TEMPS CE SOIR À GOMA
          En soirée, la pluie sera au rendez-vous. La température retombera vers 15°C. Le vent devrait atteindre en moyenne les 6 km/h (orientation du vent : Est-Sud-Est).</p>
        <p>On trouve les informations suivantes sur l'humidité :

          Le matin (16h00) : l'humidité est de 50%
          L'après-midi (17h00) : l'humidité est de 53%
          Le soir (18h00) : l'humidité est de 60%
          La nuit (15h00 le lendemain) : l'humidité est de 65%
          On peut faire les observations suivantes :

          Le matin et l'après-midi, l'humidité est relativement élevée (autour de 50%), ce qui indique un risque de pluie important.
          Le soir, l'humidité grimpe à 60%, ce qui confirme un risque de pluie persistant.
          La nuit, l'humidité atteint 65%, ce qui est encore plus élevé et explique le fort risque de pluie nocturne.
          Donc les données d'humidité viennent compléter les informations sur les probabilités de pluie et confirment qu'il y a de fortes chances de précipitations tout au long de la journée à Goma. L'humidité élevée, au-dessus de 50%, est un bon indicateur du risque de pluie.</p>
      </div>
      <br />
      <br />

    </div>
  );
};

export default Meteodata;





