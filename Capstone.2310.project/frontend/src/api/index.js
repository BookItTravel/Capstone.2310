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

// export const fetchOriginLocation = async (originLocationCode) => {
//   try {
//     const response = await axios.get(`${API_URL}/api/search/${originLocationCode}`, {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });
//     if (response.status !== 200) {
//       throw new Error("Unsuccessful");
//     }
//     return response.data;
//   } catch (error) {
//     console.error("Error getting origin location data", error);
//     throw error;
//   }
// };

// export const fetchDestinationLocation = async (destinationLocationCode) => {
//   try {
//     const response = await axios.get(`${API_URL}/api/search/${destinationLocationCode}`, {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });
//     if (response.status !== 200) {
//       throw new Error("Unsuccessful");
//     }
//     return response.data;
//   } catch (error) {
//     console.error("Error getting destination location data", error);
//     throw error;
//   }
// };

// export const fetchFlightData = async (params) => {
//   try {
//     const response = await axios.post(`${API_URL}/flight-search`, {
//       ...params,
//     }, {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });
//     if (response.status !== 200) {
//       throw new Error("Unsuccessful");
//     }
//     return response.data;
//   } catch (error) {
//     console.error("Error getting flight data", error);
//     throw error;
//   }
// };