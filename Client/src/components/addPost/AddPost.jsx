import './addPost.css';

//Fack Apis...................
import CurrentUserData from '../../FackApis/CurrentUserData'

// FontAwesome icon..............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faSmile, faTags, faVideo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import showAddPost from '../popup/showAddPost/showAddPost';


export default function AddPost() {
    return (
        <form className='postForm'>

            <div className="user form-top">
                <Link to="/profile/id">
                    <img src={CurrentUserData[0].ProfieImage} alt='' />
                </Link>
                <input type='text' placeholder={`Nini mpya ${CurrentUserData[0].name} ?`} onClick={showAddPost} />
                <button type='submit' className='btn btn-primary'>Posti</button>
            </div>

            <div className="post-categories">
                <label htmlFor='file'>
                    <input type='file' id='file' />
                    <span><FontAwesomeIcon icon={faImage} /> </span>
                    <strong>Picha</strong>
                </label>
                <label htmlFor='file'>
                    <input type='file' id='file' />
                    <span><FontAwesomeIcon icon={faVideo} /> </span>
                    <strong> Video</strong>
                </label>
                <div>
                    <span><FontAwesomeIcon icon={faTags} /> </span>
                    <strong>Vitambulisho</strong>
                </div>
                <div>
                    <span><FontAwesomeIcon icon={faSmile} /> </span>
                    <strong>Hisia</strong>
                </div>
            </div>
        </form>
    )
}