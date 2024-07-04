import { Link, Outlet, useLocation } from 'react-router-dom'
import CurrentUser from "../../FackApis/CurrentUserData";

import './dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faBullhorn, faCalendar, faChartArea, faCircleQuestion, faDashboard, faDownload, faEnvelope, faEye, faFileArrowDown, faFileExport, faFileLines, faHistory, faHome, faMap, faSearch, faUserTie } from '@fortawesome/free-solid-svg-icons';
import DarkMoode from '../../components/darkMood/DarkMoode';
export default function Dashboard() {
    const location = useLocation();

    const isActive = (path) => {
        // Handle exact path matching for active link styling
        return location.pathname.startsWith(path);
    };

    return (
        <>
            <div className="dashoard-container">
                <div className="dashoard-side">
                    <Link to='/' className='dashaboard-logo'>
                        <h3 className="logo-dashboard">Yetubook</h3>
                        <h4>MétéoWatch</h4>
                    </Link>
                    <br />
                    <Link to='/profile/id'>
                        <div className="user-dash">
                            <img src={CurrentUser.map(user => (user.ProfieImage))} alt="" />
                            {/* <p>{CurrentUser[0].name}</p> */}
                            {/* <small>{CurrentUser[0].username}</small> */}
                        </div>
                    </Link>
                    <br />

                    <div className="dash-data">
                        <Link to='/dashboard/' >
                            <div className={`dash-side-link ${isActive("/dashboard/") && "dash-active"}`}>
                                <FontAwesomeIcon icon={faHome} />
                                <h4>Dashboard</h4>
                            </div>
                        </Link>
                        <br />
                        <p><strong>Data</strong></p>

                        <Link to='/dashboard/previsions' >
                            <div className="dash-side-link">
                                <FontAwesomeIcon icon={faEye} />
                                <h4>Prévisions</h4>
                            </div>
                        </Link>
                        <Link to='/dashboard/maintenant' >
                            <div className="dash-side-link">
                                <FontAwesomeIcon icon={faFileLines} />
                                <h4>Buletin Météo</h4>
                            </div>
                        </Link>
                        <Link to='/dashboard/historique' >
                            <div className='dash-side-link'>
                                <FontAwesomeIcon icon={faHistory} />
                                <h4>Historique</h4>
                            </div>
                        </Link>
                    </div>
                    <br />
                    <div className="dash-data">
                        <p><strong>Graphiques</strong></p>

                        <Link to='/dashboard/statistiques' >
                            <div className="dash-side-link">
                                <FontAwesomeIcon icon={faChartArea} />
                                <h4>Statistiques</h4>
                            </div>
                        </Link>


                        <Link to='/dashboard/cartes' >
                            <div className="dash-side-link">
                                <FontAwesomeIcon icon={faMap} />
                                <h4>Cartes</h4>
                            </div>
                        </Link>


                        <Link to='/dashboard/alertes' >
                            <div className="dash-side-link">
                                <FontAwesomeIcon icon={faBullhorn} />
                                <h4>Alertes</h4>
                            </div>
                        </Link>

                    </div>
                    <br />
                    <div className="dash-data">
                        <p><strong>Pages</strong></p>

                        <Link to='/dashboard/creatadmins' >
                            <div className="dash-side-link">
                                <FontAwesomeIcon icon={faUserTie} />
                                <h4>Créer admins</h4>
                            </div>
                        </Link>


                        <Link to='/dashboard/calendrier' >
                            <div className="dash-side-link">
                                <FontAwesomeIcon icon={faCalendar} />
                                <h4>Calendrier</h4>
                            </div>
                        </Link>


                        <Link to='/dashboard/faqpage' >
                            <div className="dash-side-link">
                                <FontAwesomeIcon icon={faCircleQuestion} />
                                <h4>FAQ Page</h4>
                            </div>
                        </Link>

                    </div>

                </div>
                <div className="dashboard-right">
                    <Outlet />
                </div>
            </div >


        </>
    )
}