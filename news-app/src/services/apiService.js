const API_URL = 'http://localhost:8000/api'; // Adjust as necessary

// Function to get the stored token (if available)
const getToken = () => {
  return localStorage.getItem('token'); // Retrieve token directly
};

/**
 * Generic API request function.
 * Automatically adds the Bearer token if it exists.
 */
const apiRequest = async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
  try {
    const token = getToken(); // Retrieve the token

    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return { data, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

/**
 * Function to make a GET request.
 */
export const get = (url) => apiRequest(url, 'GET');

/**
 * Function to make a POST request.
 */
export const post = (url, body) => apiRequest(url, 'POST', body);
