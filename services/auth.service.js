import axios from "axios";

const API_URL = "http://localhost:3000/api";

const register = (address, email, password) => {
  return axios.post(API_URL + "signup", {
    address,
    email,
    password,
  });
};

const authService = {
  register,
};
export default authService;
