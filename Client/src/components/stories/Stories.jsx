import './stories.css';

//Facke Apis..........................
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css'

//Facke Apis..........................
import StoriesData from "../../FackApis/StoriesData"

//Components..........................
import UserStory from "./UserStory"

export default function Stories (){
    return (
        <div className="stories">
            <UserStory />

            <Swiper style={{width:'80%'}}
            slidesPerView={3.75}
            spaceBetween={10} >
                {
                    StoriesData.map((story, index) =>(
                        <SwiperSlide key={index}>
                            <div className="story" >
                                <div className="user">
                                    <img src={story.storyProfile} alt="" />
                                </div>
                                <img src={story.story} alt="" />
                                <h5>{story.name}</h5>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}