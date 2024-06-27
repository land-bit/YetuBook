import { Link } from 'react-router-dom';
// import firebase from 'firebase/app';
// import { auth } from '../../FackApis/FireBase';

import './signup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faG } from '@fortawesome/free-solid-svg-icons';

export default function Signup() {

    function signUpWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInUserWithPopup(provider)
    }

    return (
        <div className='signup'>
            <div className="card">
                <div className="left">
                    <h2>Yetubook Oradha<br />-</h2>
                    <p>
                        Karibu kwenye Yetubook, mtandao mpya wa kijamii wa Afrika!
                        Wasiliana na watu wanaoshiriki mambo yanayokuvutia.<br /><br />
                        Pamoja, tutengeneze nafasi ya kipekee kusherehekea utajiri na utofauti wa Afrika.
                        Jiunge nawengine sasa kwenye Yetubook!.
                    </p>
                    <span>Una Akaunti?</span>
                    <Link to='/login'>
                        <button className="btn btn-primary">Ingia</button>
                    </Link>
                </div>
                <form className="right">
                    <input type="text" required placeholder="jina la mtumiaji" />
                    <input type="email" required placeholder="barua pepe / email" />
                    <input type="password" required placeholder="neno la siri" />
                    <button type="submit" className='btn'>Ji oredheshe</button>
                    <button onClick={signUpWithGoogle} className='btn'>Ji oredheshe <FontAwesomeIcon icon={faG} /></button>
                </form>
            </div>
        </div>
    )
}
