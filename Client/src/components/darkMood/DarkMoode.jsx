import './darkMoode.css'

// FontAwesome Icon.....................
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";


export default function DarkMoode (){

    const DarkHandler=()=>{
        document.querySelector('body').classList.toggle('dardmood')
    }

    return(
        <div className='dark-moode-icon'>
            <FontAwesomeIcon icon={faLightbulb} onClick={DarkHandler}/>
        </div>
    )
}