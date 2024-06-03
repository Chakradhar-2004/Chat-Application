// ChatContainer.js
import React, { useState, useEffect } from 'react';
import styles from './ChatContainer.module.css';
import Logout from '../Logout/Logout';
import ChatInput from '../ChatInput/ChatInput';
import axios from "axios";
import { addMessagesRoute, getAllMessagesRoute } from '../../utils/apiRoutes';

export default function ChatContainer({ currentChat, currentUser }) {
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (currentUser && currentChat) {
      const fetchMessages = async () => {
        try {
          const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id
          });
          console.log("Fetched messages:", response.data); // Log fetched messages
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
      fetchMessages();
    }
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    if (currentUser && currentChat) {
      try {
        const response = await axios.post(addMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
          message: msg,
        });
        console.log("Message sent:", response.data); // Log sent message
        setMessages(prevMessages => [...prevMessages, response.data.message]); // Append only the new message
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(() => {
    if (currentUser && currentChat) {
      setCurrentUserName(currentChat.username);
      setCurrentUserAvatar(currentChat.avatar);
    }
  }, [currentUser, currentChat]);

  return (
    <div className={styles.ChatContainer}>
      <div className={styles.Header}>
        <div className={styles.userDetails}>
          <img src={`data:image/svg+xml;base64,${currentUserAvatar}`} alt="avatar" />
          {currentUserName && <h1>{currentUserName}</h1>}
        </div>
        <Logout />
      </div>
      <div className={styles.ChatMessages}>
        {Array.isArray(messages) &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${message && message.fromSelf ? styles.sended : styles.recieved
                }`}
            >
              {message && message.message} {/* Add null check for message */}
            </div>
          ))}
      </div>

      <div className={styles.ChatInputContainer}>
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
}
