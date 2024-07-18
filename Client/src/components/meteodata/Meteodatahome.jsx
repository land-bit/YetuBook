import React, { useState, useEffect, useRef } from 'react';
import './meteodatahome.css'
import sanny from "../../assets/icon/meteodescfigma/sunnycolor.png"
import cloud from "../../assets/icon/meteodescfigma/partlycloudy.png"
import navigation from "../../assets/icon/meteodescfigma/navigation.png"
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import { Tooltip } from 'react-leaflet';
import showMeteoDetails from '../popup/showMeteoDetails/showMeteoDetails';

const MeteodataHome = () => {

    const data = [
        {
            temperature: 18,
            time: "6:00"
        },
        {
            temperature: 23,
            time: "12:00"
        },
        {
            temperature: 17,
            time: "18:00"
        },
        {
            temperature: 18,
            time: "00:00"
        }
    ]
    return (
        <div className='meteo-data-home'>
            <div className='meteo-data-home-content'>
                <div className='meteo-data-content-title'>
                    <h3 style={{color:"white"}}>Goma <small> 24 Jun</small></h3>
                    <p>11:39</p>
                </div>
                <img src={sanny} alt='' />
                {/* <h5 style={{color:"#FAA12F", fontWeight:'100'}}>Mtazamaji wako wa majira na nyakati</h5> */}
                {/* <h5 style={{color:"#FAA12F", fontWeight:'100'}}>anaye ku arifu siku za hatari</h5> */}
                <h1 >24°C</h1>

                <div className='meteo-data-home-graph'>
                    <div style={{ height:"85px", paddingTop:"10px"}}>
                        <LineChart width={320} height={100} data={data}>
                            {/* <XAxis dataKey="time" /> */}
                            {/* <YAxis yAxisId="left" unit="°C" /> */}
                            <Tooltip />
                            <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="white" />
                        </LineChart>
                    </div>
                </div>

                <div className='meteo-data-home-forcast'>
                    <div className='m-d-h-f-content'>
                        <h3>6:00 <span className='lampe-temoine-pluie' style={{backgroundColor: "#44a73b"}}>0%</span></h3>
                        <img src={cloud} alt="" />
                        <h4>18°</h4>
                        <img style={{ width: '20px' }} src={navigation} alt="" />
                        <p>24Km/h</p>
                    </div>
                    <div className='m-d-h-f-content'>
                        <h3>12:00 <span className='lampe-temoine-pluie' style={{backgroundColor: "#44a73b"}}>28%</span></h3>
                        <img src={sanny} alt="" />
                        <h4>24°</h4>
                        <img style={{ width: '20px', rotate:"200deg" }} src={navigation} alt="" />
                        <p>13Km/h</p>
                    </div>
                    <div className='m-d-h-f-content'>
                        <h3>18:00 <span className='lampe-temoine-pluie' style={{backgroundColor: "#FAA12F"}}>60%</span></h3>
                        <img src={cloud} alt="" />
                        <h4>17°</h4>
                        <img style={{ width: '20px', rotate:"190deg" }} src={navigation} alt="" />
                        <p>15km/h</p>
                    </div>
                    <div className='m-d-h-f-content'>
                        <h3>00:00 <span className='lampe-temoine-pluie' style={{backgroundColor: "#C0341A"}}>100%</span></h3>
                        <img src={sanny} alt="" />
                        <h4>18°</h4>
                        <img style={{ width: '20px', rotate:"90deg" }} src={navigation} alt="" />
                        <p>13Km/h</p>
                    </div>
                </div>

                <button className='m-d-h-f-see-more' onClick={showMeteoDetails}>Bahati ya nvuwa ku nyesha kesho : <strong>0%</strong></button>

            </div>
        </div>
    );
};

export default MeteodataHome;







