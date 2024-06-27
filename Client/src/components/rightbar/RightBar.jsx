import './rightbar.css';

//Components.................
import Message from '../message/Message';
import FriendReqe from '../friendReqe/FriendReqe';

export default function RightBar (){
    return (
        <div className='rightBar'>
            <div className="righ-container">
                <Message />
                <FriendReqe />
            </div>
        </div>
    )
}