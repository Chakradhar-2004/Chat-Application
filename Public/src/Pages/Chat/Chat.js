import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Chat.module.css';
import { allUsersRoute } from '../../utils/apiRoutes';
import Contacts from '../Contacts/Contacts';
import Welcome from '../Welcome/Welcome';
import ChatContainer from '../ChatContainer/ChatContainer';

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = localStorage.getItem("Chat-App");
      if (!user) {
        navigate("/login");
      } else {
        try {
          const storedUser = JSON.parse(user);
          setCurrentUser(storedUser);
          setIsLoaded(true);
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
          navigate("/login");
        }
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(response.data);
        } catch (error) {
          console.error("Failed to fetch contacts:", error.response ? error.response.data : error.message);
        }
      }
    };

    fetchContacts();
  }, [currentUser]);

  return (
    <div className={styles.Container}>
      <div className={styles.Box}>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {isLoaded && currentUser === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} />
        )}
      </div>
    </div>
  );
}
