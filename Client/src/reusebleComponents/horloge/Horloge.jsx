import "./horloge.css"
import React, { useEffect } from 'react';
import './horloge.css';

export default function Horloge() {

    const deg = 6;

    useEffect(() => {
        const interval = setInterval(() => {
            let day = new Date();
            let hh = day.getHours() * 30;
            let mm = day.getMinutes() * deg;
            let ss = day.getSeconds() * deg;

            const hr = document.getElementById('hr');
            const mn = document.getElementById('mn');
            const sc = document.getElementById('sc');

            if(hr && mn && sc) {
                hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
                mn.style.transform = `rotateZ(${mm}deg)`;
                sc.style.transform = `rotateZ(${ss}deg)`;
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="horloge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div className="clock">
                <div className="hour">
                    <div className="hr" id="hr"></div>
                </div>
                <div className="min">
                    <div className="mn" id="mn"></div>
                </div>
                <div className="sec">
                    <div className="sc" id="sc"></div>
                </div>
            </div>
        </div>
    );
}