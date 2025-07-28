import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faHome,
  faLightbulb,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/lib/contexts/AuthProvider";
import NavMenubottom from "./navMenuBottom";

export default function Nav() {
  const { user } = useAuth();

  return (
    <>
      <nav className="h-16 z-10 px-[4%] justify-between backdrop-blur-lg sticky top-0 bg-card flex items-center border border-border text-primary">
        <div className="flex items-center justify-between gap-8">
          <Link to="/">
            <h3 className="logo text-3xl font-black">Yetubook</h3>
          </Link>
          <Link to="/" className="hidden lg:block">
            <FontAwesomeIcon
              icon={faHome}
              className="text-primary cursor-pointer"
              size="xl"
            />
          </Link>
          <Link to="/profile" className="hidden lg:block">
            <FontAwesomeIcon
              icon={faUser}
              className="cursor-pointer"
              size="xl"
            />
          </Link>
          <div className="bg-input hidden sm:flex items-center gap-2 px-2 py-1 rounded-full border border-border">
            <FontAwesomeIcon icon={faSearch} />
            <input type="search" className="outline-none" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-8">
          <div className="sm:hidden block">
            <FontAwesomeIcon icon={faSearch} className="cursor-pointer" />
          </div>
          <Link to="/chatbox/" className="hidden lg:block">
            <FontAwesomeIcon icon={faEnvelope} size="xl" />
          </Link>
          <Link to="/" className="hidden lg:block">
            <div className="relative cursor-pointer">
              <FontAwesomeIcon icon={faBell} size="xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                <strong>3</strong>
              </span>
            </div>
          </Link>
          <FontAwesomeIcon
            icon={faLightbulb}
            className="cursor-pointer"
            size="xl"
          />
          {/* <Link to="/" className="block lg:hidden">
          <FontAwesomeIcon icon={faBars} className="cursor-pointer" size="xl" />
        </Link> */}

          <Link to="/profile">
            <div className="items-center justify-center gap-2 hidden lg:flex">
              <img
                src={
                  user.user_metadata.avatar_url || user.user_metadata.picture
                }
                alt=""
                className="w-10 rounded-full object-cover"
              />
              <h4 className="">
                {user.user_metadata.name || user.user_metadata.slug}
              </h4>
            </div>
          </Link>
        </div>
      </nav>
      <nav>
        <NavMenubottom />
      </nav>
    </>
  );
}
