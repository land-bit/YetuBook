import React, { useEffect, useRef, useState } from "react";
import './showMeteoDetails.css'
import CloseMeteoDetails from "./closeMeteoDetails";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Meteodata from "../../meteodata/meteodata";
import MeteodataHome from "../../meteodata/Meteodatahome";
import DarkMoode from "../../darkMood/DarkMoode";


export default function ShowMeteoDetails() {


    return (
        <>
            <div className="meteo-details" >
                <div className="child-meteo-details" >
                    <div className="header-popup">
                        <div>
                            <h1>MetoWatch</h1>
                        </div>
                        <DarkMoode />
                        <span className="closeBtn-popup" onClick={CloseMeteoDetails}><FontAwesomeIcon icon={faClose} /></span>

                    </div>

                    <div className="body-popup">
                        <MeteodataHome />
                        <Meteodata />
                    </div>





                </div>
            </div>

        </>
    )
}


