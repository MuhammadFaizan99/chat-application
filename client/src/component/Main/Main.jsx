import React from 'react';
import styles from './Main.module.css';
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate()
    // Check if token is saved in localStorage
  const token = localStorage.getItem('token');

  // Function to handle clicking on the "Chat" link
  const handleChatClick = () => {
    if (!token) {
      alert('Please login to chat');
      navigate('/sign-in');
    } else {
      navigate('/chat');
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to chatting application</h1>
      <button className={styles.button} onClick={handleChatClick}>Chat Now</button>
    </div>
  );
}
