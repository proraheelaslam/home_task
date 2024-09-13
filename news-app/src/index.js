import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Adjust the path as needed

ReactDOM.render(
  <Router>  {/* Wrap AuthProvider with Router */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);
