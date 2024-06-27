import './userProfile.css'

// Fach APIs................
import CurrentUserData from '../../FackApis/CurrentUserData'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeed, faLink, faMessage } from '@fortawesome/free-solid-svg-icons'

export default function UserProfile(){
    return(
        <div className='userProlile'>
            <div className='cover-photos'>
                <img src={CurrentUserData.map(user => (user.CoverPhoto))} alt=''/>
            </div>
            <div className='profile-info'>
                <img src={CurrentUserData.map(user => (user.ProfieImage))} alt=''/>
                <div className='profile-name'>
                    <h3>{CurrentUserData.map(user => (user.name))}</h3>
                    <h5>{CurrentUserData.map(user => (user.username))}</h5>
                </div>
                <div className='profile-button'>
                    <Link to="/chatbox/id">
                        <button className='btn btn-primary'>
                            <FontAwesomeIcon icon={faMessage} />
                        </button>
                    </Link>
                    <button className='btn btn-primary'>
                        <FontAwesomeIcon icon={faFeed} /> Ni Fwate
                    </button>
                    <button className='btn'>
                        <FontAwesomeIcon icon={faLink} />
                    </button>
                </div>
                <p className='bio'>
                    Maisha ni mazuri usipoteze
                </p>
                <div className="info-profile">
                    kazi: jjjjjjjjjjjjjjjjj
                    Elimu: yyyyyyyyyyyyyy
                    Michezo: ffffffffffff
                </div>
                <div className="see-more">
                    Yanayo niusu
                </div>
            </div>
        </div>
    )
}