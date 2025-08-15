import { useAuth } from "@/lib/contexts/AuthProvider";
import {
  faBell,
  faHome,
  faMessage,
  faUmbrella,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavMenubottom() {
  const { user } = useAuth();
  return (
    <>
      <div className="flex sm:hidden justify-between z-10 items-center fixed bottom-0 rounded-tl-[15px] rounded-tr-[15px] w-full h-12 text-secondary">
        <div className="flex justify-center rounded-tl-[15px] rounded-tr-[15px] w-full h-full px-2.5 bg-left">
          <div className="flex justify-between h-full w-16 flex-col">
            <span className="w-full h-1.5 bg-secondary rounded-bl-2xl rounded-br-2xl"></span>
            <FontAwesomeIcon icon={faHome} />
            <small>Accueil</small>
          </div>
          <div className="flex justify-between h-full w-16 flex-col">
            <span></span>
            <FontAwesomeIcon icon={faUmbrella} />
            <small>Météo</small>
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-[35%] h-full">
          <div className="absolute w-screen left-0 flex items-center flex-col -bottom-2.5">
            <img
              src={user.avatar_url || user.picture}
              alt=""
              className="relative img-contener cursor-pointer left-0 z-40 top-11 w-10 aspect-square rounded-full border-4 border-primary"
            />
            <div className="top-0 left-0 w-24 h-24 border-[25px] border-primary border-l-transparent border-b-transparent border-b-[25px] rounded-full creu"></div>
          </div>
        </div>
        <div className="flex justify-center rounded-tl-[15px] rounded-tr-[15px] w-full h-full px-2.5 bg-right">
          <div className="flex justify-between h-full w-16 flex-col">
            <span></span>
            <FontAwesomeIcon icon={faMessage} />
            <small>Chat</small>
          </div>
          <div className="relative flex justify-between h-full w-16 flex-col">
            <span></span>
            <FontAwesomeIcon icon={faBell} />
            <span className="absolute right-3 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              <strong>3</strong>
            </span>
            <small>Notifications</small>
          </div>
        </div>
      </div>
    </>
  );
}
