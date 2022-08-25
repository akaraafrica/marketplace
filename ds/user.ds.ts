import { api } from "../services/apiClient";

const url = `/api/user`;

class User {
  constructor() {}

  async fetch(walletAddress: string) {
    if (!walletAddress) {
      console.log("walletAddress is ", walletAddress);
      return null;
    }

    try {
      const response = await api.get(`${url}/${walletAddress}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async fetchAll() {
    try {
      const response = await api.get(`${url}/signup`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update() {}

  async fetchSellers() {
    try {
      const response = await api.get(`${url}/sellers`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new User();
