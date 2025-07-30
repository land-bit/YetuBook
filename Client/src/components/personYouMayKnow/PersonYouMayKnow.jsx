import "./personYouMayKnow.css";

import PersonData from "../../FackApis/personData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function PersonYouMayKnow() {
  return (
    <div className="person-container w-full">
      <h4 className="others pb-4">Peut-être que vous connais...</h4>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {PersonData.map((person, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/3 2xl:basis-1/4"
            >
              <div
                className={`h-48 flex flex-col items-center justify-end pb-4 bg-cover bg-center rounded-2xl`}
                style={{ backgroundImage: `url(${person.img})` }}
              >
                <h5 className="text-lg text-center mx-4 text-white font-black">
                  {person.name}
                </h5>
                <button className=" text-white flex gap-2 items-center justify-center bg-primary rounded-full p-2">
                  <FontAwesomeIcon icon={faUserPlus} color="white" />
                  <span>Ajouter</span>
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={"-left-7 text-primary font-black z-1000"}
        />
        <CarouselNext className={"-right-7 text-primary font-black z-20"} />
      </Carousel>
    </div>
  );
}
