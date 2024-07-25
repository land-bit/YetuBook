import React from "react";
import './progressbar.css'
export default function ProgressBar({ tag, value }) {
    return (
        <>
            <div className="chance-rain">
                <div className="chance-rain-date">
                    {/* <FontAwesomeIcon icon={faCalendar} /> */}
                    <span >{tag}</span>
                </div>
                <div>
                    <span className="percentage" >{value}%</span>
                </div>
                <div className="progresse-bar" >
                    <div className="progresse-bar-child" style={{ marginLeft: `${value}%` }}></div>
                </div>
            </div>
        </>
    )
}