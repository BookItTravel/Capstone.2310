import axios from "axios";

const API_URL = "http://localhost:3000";

// Login request
export const login = async (user, pwd) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      username: user,
      password: pwd,
    });
    return response;
  } catch (error) {
    console.error("failed to log in");
    throw error;
  }
};

// Register request
export const register = async (user, email, pwd) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      username: user,
      email: email,
      password: pwd,
    });
    return response;
  } catch (error) {
    console.error("registration failed");
    throw error;
  }
};
