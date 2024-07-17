import DashboardNav from "../DashboardNav";
import '../dashboard.css'
import '../dashboardchildren.css'

//Meteo description images
import drizzle from "../../../assets/icon/meteodescription/drizzle.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faLocation } from "@fortawesome/free-solid-svg-icons";

import dataPrevisions from "../../../FackApis/weather/previsiondataexemple.js";
import WeatherForecast, { PrevisionsCard } from "./PrevisionsBruillons.jsx";
import ProgressBar from "../../../reusebleComponents/ProgressBar/ProgressBar.jsx";
export default function DashboardHome() {
    return (
        <>

            <DashboardNav text={'Dashboard Home'} />
            <div className="dashoard-body">
                <div className="dashoard-data-visualisation">
                    <div className="visualisation-top">
                        <div className="dashoard-data-visualisation-item maintenant">
                            <h3>Maintenant</h3>
                            <small>Mercredi 19/6/2024</small>
                            <br />
                            <img src={drizzle} alt="" />
                            <h1>17°C</h1>
                            <br />
                            <small>Pluie modérée</small>
                            <hr />
                            <FontAwesomeIcon icon={faLocation} />
                            <small> Goma</small>
                            <br />
                            <FontAwesomeIcon icon={faCalendar} />
                            <small> 19/06/2024</small>
                        </div>

                        {/* <PrevisionsCard weatherData={dataPrevisions.list}/> */}

                        {/* <WeatherForecast weatherData={dataPrevisions.list}/> */}

                        <ProgressBar tag={'samedi 5/7'} value={45} />                 

                    </div>
                    <div className="visualisation-bottom">
                        <div className="dashoard-data-visualisation-item historique">
                            <table>table</table>
                        </div>
                    </div>
                </div>
            </div >

            <div className="dashoard-footer">
                <p>Dashboard footer</p>
            </div>

        </>
    )
}