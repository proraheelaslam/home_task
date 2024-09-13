// Login.js
import React, { useState, useContext } from 'react';
import './Login.css'; // Use this CSS file for styling
import { post } from '../services/apiService'; // Adjust the path as needed
import { useAuth } from '../context/AuthContext'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { NewsContext } from '../context/NewsContext'; // Import the NewsContext to access fetchNews

const Login = () => {
  const { login } = useAuth(); // Get login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { fetchNews } = useContext(NewsContext); // Get fetchNews from NewsContext

  const navigate = useNavigate(); // For navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    const { data, error: apiError, success: apiSuccess } = await post('/login', {
      email,
      password,
    });

    if (apiSuccess) {
      let resData = data.data;
      login(resData); // Call login function with user data including token
      setSuccess(data.message || 'Login successful!');
      
      // Fetch the news after login
      fetchNews();
      
      navigate('/'); // Redirect to the home page or another route
    } else {
      setError(apiError || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="welcome-back">
          <h1>News App</h1>
          <p>Stay updated with the latest news and trends from around the world.</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form">
          <h2>Welcome back!</h2>
          <p>Access personalized news and stay informed on the topics that matter to you.</p>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <form onSubmit={handleLogin}>
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
            <button type="submit">Login</button>
          </form>

          <p className="register-redirect">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
