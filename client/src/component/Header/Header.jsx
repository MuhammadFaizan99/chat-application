import React from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  // Function to handle sign-out
  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

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
    <div className={styles.header}>
      <div className={styles.logo}>
        Logo
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          <li><Link to="/" className={styles.navLink}>Home</Link></li>
          {token ? (
            <li><Link to="/chat" className={styles.navLink}>Chat</Link></li>
          ) : (
            <li><span className={styles.navLink} onClick={handleChatClick}>Chat</span></li>
          )}
        </ul>
      </nav>
      <div className={styles.buttons}>
        {token ? (
          // Render sign-out button if token exists
          <button className={styles.button} onClick={handleSignOut}>Sign Out</button>
        ) : (
          // Render sign-up and sign-in buttons if no token
          <>
            <button className={styles.button} onClick={() => navigate('/sign-in')}>Sign In</button>
            <button className={styles.button} onClick={() => navigate('/sign-up')}>Sign Up</button>
          </>
        )}
      </div>
    </div>
  );
}
