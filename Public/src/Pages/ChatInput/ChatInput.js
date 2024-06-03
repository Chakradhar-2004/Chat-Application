import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styles from './ChatInput.module.css';

export default function ChatInput({ handleSendMsg }) {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      handleSendMsg(message);
      setMessage('');
    }
  };

  const handleEmojiClick = (emoji, event) => {
    setMessage(message + emoji.emoji);
  };

  // const handleFileSelect = (e) => {
  //   const file = e.target.files[0];
  //   // Handle the selected file (e.g., send it to a server)
  //   // Example: onSendFile(file);
  // };

  return (
    <div className={styles.ChatInput}>
      <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
      {/* <input type="file" onChange={handleFileSelect} /> */}
      <textarea
        value={message}
        onChange={handleInputChange}
        placeholder="Type your message..."
        rows={4}
        cols={40}
      />
      <button onClick={handleSendMessage}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
      {showEmojiPicker && (
        <Picker onEmojiClick={handleEmojiClick} />
      )}
    </div>
  );
}
