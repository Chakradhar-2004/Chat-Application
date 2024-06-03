import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Styles from './setAvatar.module.css';
import { setAvatarRoute } from '../../utils/apiRoutes';

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [avatarsLoading, setAvatarsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const setProfileAvatar = async () => {
    const userDataString = localStorage.getItem("Chat-App");
    if (!userDataString) {
      console.error("No user data found in localStorage");
      navigate("/login");
      return;
    }
  
    let userData;
    try {
      userData = JSON.parse(userDataString);
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      navigate("/login");
      return;
    }
  
    if (!userData || !userData._id) {
      console.error("Invalid user data:", userData);
      navigate("/login");
      return;
    }
  
    try {
      const { data } = await axios.post(`${setAvatarRoute}/${userData._id}`, { image: avatars[selectedAvatar] });
      if (data) {
        userData.avatar = data.image;
        localStorage.setItem("Chat-App", JSON.stringify(userData));
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error setting avatar:", error);
    }
  };
  

  useEffect(() => {
    const userDataString = localStorage.getItem("Chat-App");
    if (!userDataString) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`, {
            responseType: 'arraybuffer'
          });
          const buffer = Buffer.from(response.data, 'binary');
          data.push(buffer.toString("base64"));
        } catch (error) {
          console.error("Error fetching avatar:", error);
        }
      }
      setAvatars(data);
      setAvatarsLoading(false);
    };

    fetchAvatars();
  }, []);

  if (avatarsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.title}>
        <h1>Choose Your Avatar</h1>
      </div>
      <div className={Styles.avatars}>
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`${Styles.avatar} ${selectedAvatar === index ? Styles.selected : ""}`}
            onClick={() => setSelectedAvatar(index)}
          >
            <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
          </div>
        ))}
      </div>
      <button
        className={Styles.setAvatarButton}
        onClick={setProfileAvatar}
        disabled={selectedAvatar === undefined}
      >
        Set Avatar
      </button>
    </div>
  );
}
