import './friendReqe.css';
import {Link} from "react-router-dom"

// FackApis...................
import FriendReqData from "../../FackApis/FirendReqData"

export default function FriendReqe (){
    return (
        <div className='Friend-Request'>
            <br />
            <h4>Aliko la urafiki</h4>

            {
                FriendReqData.map((friend, index)=>(
                    <div className="request" key={index}>
                        <Link to='/profile/id'>
                            <div className="inform" >
                                <div className="user">
                                    <img src={friend.img} alt='' />
                                    <h5>{friend.name}</h5>
                                </div>
                                <div className='info-name'>                                    
                                    <p>{friend.info}</p>
                                </div>
                            </div>
                        </Link>

                        <div className="action">
                            <button className='btn btn-primary'>Itika</button>
                            <button className='btn btn-red'>Kataa</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}