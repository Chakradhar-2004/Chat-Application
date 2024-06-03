import React, { useEffect, useState } from 'react';
import Logo from '../images/logo.png';
import styles from './Contacts.module.css';

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact)
    // Implement your logic to handle the chat selection
  };

  return (
    <div className={styles.Container}>
      {currentUserName && (
        <div>
          <div className={styles.Brand}>
            <img src={Logo} alt="logo" />
          </div>
          <div className={styles.Contacts}>
            {contacts.map((contact, index) => (
              <div
                className={`${styles.contact} ${index === currentSelected ? styles.selected : ''}`}
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className={styles.Avatar}>
                  <img src={`data:image/svg+xml;base64,${contact.avatar}`} alt="avatar" />
                </div>
                <div className={styles.UserName}>
                  <h1>{contact.username}</h1>
                </div>
                
              </div>
            ))}
            <div className={styles.CurrentAvatar}>
                  <img src={`data:image/svg+xml;base64,${currentUserAvatar}`} alt="avatar" />
                  <div className={styles.UserName}>
                  <h1>{currentUserName}</h1>
                </div>
            </div>
                
          </div>
        </div>
      )}
    </div>
  );
}
