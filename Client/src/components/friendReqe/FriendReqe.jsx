import "./friendReqe.css";
import { Link } from "react-router-dom";

// FackApis...................
import FriendReqData from "../../FackApis/FirendReqData";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/contexts/AuthProvider";
import { supabase } from "@/supabaseClient";
import axios from "axios";

export default function FriendReqe() {
  const { user } = useAuth();
  const [request, setRequest] = useState([]);
  const API = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const session = await supabase.auth.getSession();
      const token = session.data.session.access_token;
      try {
        const list = await axios.get(`${API}/api/profile/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!list.statusText == "OK") {
          throw new Error("Network response was not ok");
        }
        setRequest(list.data.receivedRequests);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  const handleAccept = async (id) => {
    setLoading(true);
    const session = await supabase.auth.getSession();
    const token = session.data.session.access_token;
    try {
      const response = await axios.post(
        `${API}/api/friends/requests/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setRequest((prevUsers) =>
          prevUsers.filter((friend) => friend.id !== id)
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
    <div className="Friend-Request">
      <br />
      <h4>{"Invitation d'amis"}</h4>

      {request.map((friend, index) => (
        <div className="request" key={index}>
          <Link to="/profile/id">
            <div className="inform">
              <div className="user">
                <img src={friend.requester.avatarUrl} alt="" />
                <h5 className="text-foreground">{friend.requester.fullName}</h5>
              </div>
              <div className="info-name">
                <p>{friend.info} Amis en commun</p>
              </div>
            </div>
          </Link>

          <div className="action">
            <button
              className="btn btn-primary"
              onClick={() => handleAccept(friend.id)}
              disabled={loading}
            >
              Accepter
            </button>
            <button className="btn btn-red">Refuser</button>
          </div>
        </div>
      ))}

      {FriendReqData.map((friend, index) => (
        <div className="request" key={index}>
          <Link to="/profile/id">
            <div className="inform">
              <div className="user">
                <img src={friend.img} alt="" />
                <h5 className="text-foreground">{friend.name}</h5>
              </div>
              <div className="info-name">
                <p>{friend.info} Amis en commun</p>
              </div>
            </div>
          </Link>

          <div className="action">
            <button className="btn btn-primary">Accepter</button>
            <button className="btn btn-red">Refuser</button>
          </div>
        </div>
      ))}
    </div>
  );
}
