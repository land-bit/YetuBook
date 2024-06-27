import DashboardNav from "../DashboardNav";
import '../dashboard.css'
import '../dashboardchildren.css'

//Meteo description images
import drizzle from "../../../assets/icon/meteodescription/drizzle.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faLocation } from "@fortawesome/free-solid-svg-icons";

import dataPrevisons from "../previsiondataexemple.js"
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

                        {/* {dataPrevisons.list} l'objet à maper */}

                        <div className="visualisation-previson">
                            <div className="dashoard-data-visualisation-item previsions">
                                <h3>Aujourd'hui</h3>
                                <FontAwesomeIcon icon={faCalendar} />
                                <small> 19/06/2024</small>
                                <br />
                                <FontAwesomeIcon icon={faClock} />
                                <small>  12:00:00</small>
                                <br />
                                {/* <img src={`http://openweathermap.org/img/wn/${dataPrevisons.list[0].weather[0].icon}@4x.png`} alt="Conditions météo" /> */}
                                <h1>18°C</h1>
                                <small>Pluie modérée</small>
                                <hr />
                                <FontAwesomeIcon icon={faLocation} />
                                <small> Goma</small>
                                <br />

                            </div>
                        </div>

                        <div className="visualisation-previson">
                            <div className="dashoard-data-visualisation-item previsions">
                                <h3>Demain</h3>
                                <FontAwesomeIcon icon={faCalendar} />
                                <small>  19/06/2024</small>
                                <br />
                                <FontAwesomeIcon icon={faClock} />
                                <small>  12:00:00</small>
                                <br />
                                {/* <img src={`http://openweathermap.org/img/wn/${dataPrevisons.list.weather[0].icon}@4x.png`} alt="Conditions météo" /> */}
                                <h1>20°C</h1>
                                <small>Pluie modérée</small>
                                <hr />
                                <FontAwesomeIcon icon={faLocation} />
                                <small> Goma</small>
                                <br />
                            </div>
                        </div>

                        <div className="visualisation-prevision-chance-rain">
                            {
                                dataPrevisons.list.map((prevision, index) => (
                                    <div class="chance-rain">
                                        <div className="chance-rain-date">
                                            <FontAwesomeIcon icon={faCalendar} />
                                            <span >{prevision["dt_txt"]}</span>
                                        </div>
                                        <div>
                                            <span className="percentage" >{Math.floor(prevision.pop * 100)}%</span>
                                        </div>
                                        <div className="progresse-bar" style={{ width: `${prevision.pop * 100}%` }}></div>
                                    </div>
                                ))
                            }
                        </div>



                    </div>
                    <div className="visualisation-bottom">
                        <div className="dashoard-data-visualisation-item historique">
                            <table>table</table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashoard-footer">
                <p>Dashboard footer</p>
            </div>

        </>
    )
}