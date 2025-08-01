import "./stories.css";

//Facke Apis..........................
import StoriesData from "../../FackApis/StoriesData";

//Components..........................
import UserStory from "./UserStory";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function Stories() {
  return (
    <div className="stories">
      <UserStory />
      <Carousel
        opts={{
          align: "start",
        }}
        className="md:w-[calc(100%-9rem)] w-[calc(100%-6rem)]"
      >
        <CarouselContent className={"w-[calc(100%-2rem)] pl-4"}>
          {StoriesData.map((story, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 lg:basis-1/4 2xl:basis-1/7 story w-30 h-52 p-0 mx-1 bg-cover bg-center"
              style={{ backgroundImage: `url(${story.story})` }}
            >
              <div className="">
                <div className="user">
                  <img src={story.storyProfile} alt="" />
                </div>
                <h5 className="text-white absolute text-center w-full bottom-2 z-10 font-bold">
                  {story.name}
                </h5>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
