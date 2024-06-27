import './feeds.css';
import {Link} from 'react-router-dom'

// Components................
import Comments from '../comments/Comments';

//FontAwesome Icon.............
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faListDots, faShare } from '@fortawesome/free-solid-svg-icons';

// States...............
import React, {useState} from 'react'

export default function Feed ({fed}){

    //States Discuse...........

    let [openComment, SetOpenComment] = useState(false);

    const CommentHandeler = () => {
        SetOpenComment(!openComment)
    }

    return (
        <div className='feed' key={fed.id}>
            <div className="top-centent">
                <Link to='./profile/id'>
                    <div className="user">
                        <img src={fed.feedProfile} alt='' />
                        <div>
                            <h5>{fed.name}</h5>
                            <small>{fed.time}</small>
                        </div>
                    </div>
                </Link>
                <span><FontAwesomeIcon icon={faListDots} /> </span>
            </div>
            <div className="mid-content">
                <p>{fed.desc}</p>
                <img src={fed.feedImage} alt='' />
            </div>
            <div className='like-icon'>
                {/* <FontAwesomeIcon icon={faHeart} /> */}
            </div>
            <div className="bottom-content">
                <div className='action-item'>
                    <span><FontAwesomeIcon icon={faHeart} /> 14 like</span>
                </div>
                <div className='action-item' onClick={CommentHandeler}>
                    <span><FontAwesomeIcon icon={faComment} /> 4 Maoni</span>
                </div>
                <div className='action-item'>
                    <span><FontAwesomeIcon icon={faShare} /> 3 Migawanyiko</span>
                </div>
            </div>
            {openComment && <Comments/>}
            
        </div>
    )
}