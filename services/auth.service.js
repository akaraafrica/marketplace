import axios from "axios";

const API_URL = "http://localhost:3000/api/user";

const register = (address, email, password) => {
  try {
    return axios.post(API_URL + "signup", {
      address,
      email,
      password,
    });
  } catch (error) {
    return error;
  }
};

const authService = {
  register,
};
export default authService;
