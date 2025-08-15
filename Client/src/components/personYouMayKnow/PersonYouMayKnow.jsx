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
import axios from "axios";
import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/contexts/AuthProvider";
import { Loader2Icon } from "lucide-react";

export default function PersonYouMayKnow() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const API = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const session = await supabase.auth.getSession();
      const token = session.data.session.access_token;
      try {
        const list = await axios.get(`${API}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!list.statusText == "OK") {
          throw new Error("Network response was not ok");
        }

        setUsers(
          list.data.filter(
            (person) =>
              person.id !== user.id &&
              (person.sentRequests.length === 0 ||
                person.sentRequests.every(
                  (i) => i.receiverId !== user.id && i.requesterId !== user.id
                )) &&
              (person.receivedRequests.length === 0 ||
                person.receivedRequests.every(
                  (i) => i.receiverId !== user.id && i.requesterId !== user.id
                ))
          )
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  const handleAddFriend = async (userId) => {
    setLoading(true);
    const session = await supabase.auth.getSession();
    const token = session.data.session.access_token;
    try {
      const response = await axios.post(
        `${API}/api/friends/request`,
        { receiverId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setUsers((prevUsers) =>
          prevUsers.filter((friend) => friend.id !== userId)
        );
      } else {
        console.error("Failed to add friend");
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    } finally {
      setLoading(false);
    }
  };

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
          {users.map((friend, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/3 2xl:basis-1/4"
            >
              <div
                className={`h-48 flex flex-col items-center justify-end bg-cover bg-center rounded-2xl story`}
                style={{ backgroundImage: `url(${friend.avatarUrl})` }}
              >
                <button
                  className=" text-white flex gap-2 items-center justify-center bg-primary cursor-pointer rounded-full mb-4 p-2 z-100"
                  onClick={() => handleAddFriend(friend.id)}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <FontAwesomeIcon icon={faUserPlus} color="white" />
                  )}
                  <span>Ajouter</span>
                </button>
                <h5 className="text-lg text-center mx-4 text-white font-black z-10">
                  {friend.fullName}
                </h5>
              </div>
            </CarouselItem>
          ))}
          {PersonData.map((person, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/3 2xl:basis-1/4"
            >
              <div
                className={`h-48 flex flex-col items-center justify-end bg-cover bg-center rounded-2xl story`}
                style={{ backgroundImage: `url(${person.img})` }}
              >
                <button className=" text-white flex gap-2 items-center justify-center bg-primary rounded-full mb-4 p-2">
                  <FontAwesomeIcon icon={faUserPlus} color="white" />
                  <span>Ajouter</span>
                </button>
                <h5 className="text-lg text-center mx-4 text-white font-black z-10">
                  {person.name}
                </h5>
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
