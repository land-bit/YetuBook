import { Link } from "react-router-dom"
import "./leftbar.css"
import Meteodata from "../meteodata/meteodata"
//Components..................
import CurrentUser from "../../FackApis/CurrentUserData"


//Icon Image.........................
import Ai from '../../assets/icon/brain.png'
import Firend from '../../assets/icon/1.png'
import Groups from '../../assets/icon/2.png'
import Market from '../../assets/icon/3.png'
import watch from '../../assets/icon/4.png'
import Gallery from '../../assets/icon/5.png'
import Videos from '../../assets/icon/6.png'
import Statistique from '../../assets/icon/8.png'
import MeteodataHome from "../meteodata/Meteodatahome"
import PersonYouMayKnow from "../personYouMayKnow/PersonYouMayKnow"

export default function LeftBar() {
    return (
        <div className="leftBar">
            <div className="left-container">

                <MeteodataHome />

                {/* <Meteodata /> */}

                <h4 className="others">Njia zako za mkato</h4>

                <div className="menu">

                    <Link to='/chatgpt'>
                        <div className="item">
                            <div className="icon-menu"><img src={Ai} alt="" /></div>
                        </div>
                    </Link>

                    <Link to='/boutique'>
                        <div className="item">
                            <div className="icon-menu"><img src={Market} alt="" /></div>
                        </div>
                    </Link>

                    <Link to='/dashboard'>
                        <div className="item">
                            <div className="icon-menu"><img src={Statistique} alt="" /></div>
                        </div>
                    </Link>

                    <Link to='/'>
                        <div className="item">
                            <div className="icon-menu"><img src={Firend} alt="" /></div>
                        </div>
                    </Link>

                    <Link to='/'>
                        <div className="item">
                            <div className="icon-menu"><img src={Groups} alt="" /></div>
                        </div>
                    </Link>

                    <Link to='/'>
                        <div className="item">
                            <div className="icon-menu"><img src={watch} alt="" /></div>
                        </div>
                    </Link>

                    <Link to='/'>
                        <div className="item">
                            <div className="icon-menu"><img src={Gallery} alt="" /></div>
                        </div>
                    </Link>

                    <Link to='/'>
                        <div className="item">
                            <div className="icon-menu"><img src={Videos} alt="" /></div>
                        </div>
                    </Link>

                    
                </div>

                <div className="suggestion-amis">
                <PersonYouMayKnow />
                </div>
                <br />


                <hr />
            </div>
        </div>
    )
}