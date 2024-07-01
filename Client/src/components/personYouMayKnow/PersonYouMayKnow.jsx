import './personYouMayKnow.css';
import { Link } from "react-router-dom"

// FackApis...................
import PersonData from "../../FackApis/personData"
import { Swiper, SwiperSlide } from "swiper/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function PersonYouMayKnow() {
    return (
        <div className='person-container'>
            <h4 className="others">Labda una mfahamu...</h4>
            <br />
            <div className='person-swiper'>
                <Swiper
                    slidesPerView={3.89}
                    spaceBetween={10}
                    direction={"horizontal"}
                    speed={500}
                    effect='slide'
                >
                    {
                        PersonData.map((person, index) => (
                            <SwiperSlide key={index} style={{ zIndex: `${index}` }}>
                                <div className="person-chald" >
                                    <div className='person'>
                                        <img src={person.img} alt="" />
                                        <h5>{person.name}</h5>
                                        <small>34 rafiki pamoja</small>
                                        <div className='person-action'>
                                            <button className='btn-red-person'><FontAwesomeIcon icon={faUserPlus} />Ongeza</button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )).reverse()
                    }
                </Swiper>
            </div>

        </div>
    )
}