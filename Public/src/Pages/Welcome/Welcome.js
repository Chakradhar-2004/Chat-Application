import React from 'react'
import styles from './Welcome.module.css';
import { useState,useEffect } from 'react';
export default function Welcome({currentUser}) {
    const[currentUserName, setCurrentUserName] = useState(undefined)
    const[currentUserAvatar, setCurrentUserAvatar] = useState(undefined)

    useEffect(()=>{
        if(currentUser){
            setCurrentUserName(currentUser.username)
            setCurrentUserAvatar(currentUser.avatar)
        }
    },[currentUser])
  return (
    <div className={styles.Welcome}>
      {currentUserAvatar && <img src={`data:image/svg+xml;base64,${currentUserAvatar}`} alt="avatar" />}
      {currentUserName && <h1>{currentUserName}</h1>}
      <h3>Enjoy realtime chatting</h3>
    </div>
  )
}
