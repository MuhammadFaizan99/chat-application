import React, { useState } from 'react';
import styles from './SignIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

export default function SignIn() {
  const navigate = useNavigate();
  // State to hold form data
  const [formData, setFormData] = useState({
    Email: '',
    Password: ''
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to the server
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}users/sign-in`, formData);
      const token = response.data.token;
      // Store the token in localStorage
      localStorage.setItem('token', token);
      alert("Sign-in successfully"); 
      navigate("/");
    } catch (error) {
      console.error('Error:', error); // Log any errors
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h2>Sign In</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="Email" value={formData.Email} onChange={handleInputChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="Password" value={formData.Password} onChange={handleInputChange} />
        </div>
        <button type="submit" className={styles.button}>Sign In</button>
      </form>
      <div className={styles.newHere}>
        <p>New here? <Link to='/sign-up' className={styles.link}>Sign Up</Link></p>
      </div>
    </div>
  );
}
