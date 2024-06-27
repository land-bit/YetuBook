import { Link } from 'react-router-dom';
// import firebase from 'firebase';
// import { auth } from '../../FackApis/FireBase'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './login.css'
import { faG } from '@fortawesome/free-solid-svg-icons';

export default function Login() {

    // function logInWithGoogle(){
    //     const provider = new firebase.auth.GoogleAuthProvider();
    //     auth.signInWithPopup(provider)
    // }

    return (
        <div className='login'>
            <div className="card">
            <div className="left">
                <h2>Yetubook <br/>-</h2>
                <p>
                Karibu kwenye Yetubook, mtandao mpya wa kijamii wa Afrika! 
                Wasiliana na watu wanaoshiriki mambo yanayokuvutia.<br/><br/>
                Pamoja, tutengeneze nafasi ya kipekee kusherehekea utajiri na utofauti wa Afrika. 
                Jiunge nawengine sasa kwenye Yetubook!.
                </p>
                <span>Hauna Akaunti?</span>
                <Link to='/signup'>
                    <button className="btn btn-primary">Ji orezeshe</button>
                </Link>
            </div>
            <form className="right">
                <input type="text" required placeholder="jina la mtumiaji"/>
                <input type="password" required placeholder="neno la siri"/>
                <button type="submit" className='btn'>Ingia</button>
                {/* <button onClick={logInWithGoogle} type="submit" className='btn'>Ingiya na <FontAwesomeIcon icon={faG}/></button> */}

            </form>
        </div>
        </div>
    )
}