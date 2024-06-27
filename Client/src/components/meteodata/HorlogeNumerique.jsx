import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function HorlogeNumerique() {
    const [heure, setHeure] = useState(new Date().toLocaleTimeString());
    const [millisecondes, setMillisecondes] = useState(new Date().getMilliseconds());



    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            setHeure(new Date().toLocaleTimeString('fr-FR'));
            setMillisecondes(date.getMilliseconds());
        }, 1);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date().toLocaleDateString('fr-FR', options);

    return (
        <div className="horloge-numerique">
            <div><FontAwesomeIcon icon={faCalendar} /><span> {date} </span></div>
            <div><FontAwesomeIcon icon={faClock} /><span> {heure}:{millisecondes}</span></div>
        </div>
    )
}