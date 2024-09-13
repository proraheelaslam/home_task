import React, { useState, useContext  } from 'react';
import './Login.css'; // Import the CSS file
import { post } from '../services/apiService'; // Adjust the path as needed
import { useAuth } from '../context/AuthContext'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { NewsContext } from '../context/NewsContext';


const Register = () => {
  const { login } = useAuth(); // Get login function and setUser from context
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { fetchNews } = useContext(NewsContext);

  const navigate = useNavigate(); // For navigation

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setError('');
    setSuccess('');

    const { data, error: apiError, success: apiSuccess } = await post('/register', {
      name,
      email,
      password,
      c_password: confirmPassword,
    });

    if (apiSuccess) {
      let resData = data.data;
      login(resData); // Call login function with token
    
      setSuccess(data.message || 'Registration successful! You can now log in.');
      fetchNews(); 
      navigate('/'); // Redirect to the home page or another route
    } else {
      setError(apiError || 'Registration failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="welcome-back">
          <h1>Join News App</h1>
          <p>Create an account to stay updated with the latest news and trends from around the world.</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form">
          <h2>Create an account</h2>
          <p>Sign up to access personalized news and stay informed on the topics that matter to you.</p>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Register</button>
          </form>

          <p className="login-redirect">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
