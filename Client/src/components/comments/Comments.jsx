import './comments.css'
import { Link } from 'react-router-dom';

//Fache Apis..........................
import CommentData from '../../FackApis/CommetData';
import CurrentUserData from "../../FackApis/CurrentUserData"

export default function Comments (){
    return(
        <div className='comments'>
            <div className='writebox'>
                <form action='#'>
                    <div className='user'>
                        <img src={CurrentUserData.map(user => (user.ProfieImage))} alt=''/>
                        <input type='text' placeholder='Andika maoni yako' />
                        <button type='submit' className='btn btn-primary'>Tuma</button>
                    </div>
                </form>
            </div>
            {
                CommentData.map(comment => (
                    <Link to='/profile/id'>
                        <div className='user' key={comment.id}>
                            <img src={comment.commentProfile} alt='' />
                            <div >
                                <h5>{comment.name}</h5>
                                <p>{comment.CommeText}</p>
                            </div>
                            <small>1h</small>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}