import React from "react";
import './showAddPost.css'
import { faChevronCircleDown, faChevronDown, faClose, faEarth } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DarkMoode from "../../darkMood/DarkMoode";
import CloseAddPost from "./closeAddPost";
import CurrentUserData from "../../../FackApis/CurrentUserData"
import { faImage, faSmile, faTags, faVideo } from '@fortawesome/free-solid-svg-icons';



export default function ShowAddPost() {


    return (
        <>
            <div className="add-post-pop" >
                <div className="child-add-post-pop" >

                    <div className="header-popup-post">

                        <DarkMoode />
                        <h1>Ongeza Puplication</h1>
                        <span className="closeBtn-popup-post" onClick={CloseAddPost}><FontAwesomeIcon icon={faClose} /></span>

                    </div>

                    <div className="body-popup-post">
                        <div className="user form-top-popup-user">
                            <img src={CurrentUserData[0].ProfieImage} alt='' />
                            <div>
                                <h3>{CurrentUserData[0].name}</h3>
                                <p className="public-option"><FontAwesomeIcon icon={faEarth}/>Public<FontAwesomeIcon icon={faChevronDown}/></p>
                            </div>
                        </div>

                        <div>
                            <input type='text' placeholder={`Nini mpya ${CurrentUserData[0].name} ?`} />
                            <button type='submit' className='btn btn-primary'>Posti</button>
                        </div>

                        <div className="post-categories-popup">
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

                    </div>
                </div>
            </div>
        </>
    )
}


