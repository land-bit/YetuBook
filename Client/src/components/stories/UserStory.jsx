import './stories.css';

//Facke Apis........................
import CurrentUserData from '../../FackApis/CurrentUserData'

// FontAwesome Icon......................
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

export default function UserStory (){
    return(
        <div className="userStory">
            {/* <div className="user">
                <img src={CurrentUserData.map(user => (user.ProfieImage))} alt='' />
            </div> */}
            <img src={CurrentUserData.map(user => (user.ProfieImage))} alt='' />
            
            <div className='addStory'>
                <label htmlFor='storyFiles'>
                    <FontAwesomeIcon icon={faAdd}/>
                    <input type='file' id='storyFiles' />
                </label>
                <h5>Ongeza Story</h5>
            </div>
        </div>
    )
}