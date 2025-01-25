// axiosInstance.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  timeout: 10000, // Optional timeout (in ms)
});

// Set up Axios interceptors for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // If the request is successful, return the response
    return response;
  },
  (error) => {
    // Handle the error (e.g., server is down)
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error('Response error:', error.response);
    } else if (error.request) {
      // No response received from the server
      console.error('No response received:', error.request);
    } else {
      // Something else went wrong while setting up the request
      console.error('Axios error:', error.message);
    }

    // Optionally, you can show a generic message, log the error, or trigger a notification
    alert('An error occurred while communicating with the server.');

    // Return a rejected promise so the error is propagated further if needed
    return Promise.reject(error);
  }
);

export default axiosInstance;
