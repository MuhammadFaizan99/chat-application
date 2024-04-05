import React, { useState } from 'react';
import styles from './SignUp.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

export default function SignUp() {
  const navigate = useNavigate()
  // State to hold form data
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: ''
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to the server
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}users/sign-up`, formData);
      alert("User registered successfully"); 
      navigate("/sign-in")
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
      <h2>Sign Up</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="Name" value={formData.Name} onChange={handleInputChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="Email" value={formData.Email} onChange={handleInputChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="Password" value={formData.Password} onChange={handleInputChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="ConfirmPassword" value={formData.ConfirmPassword} onChange={handleInputChange} />
        </div>
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
      <div className={styles.login}>
        <p>Already a member? <Link to='/sign-in' className={styles.link}>Login</Link></p>
      </div>
    </div>
  );
}
