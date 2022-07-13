import axios from "axios";
import Router from "next/router";

const baseUrl = `/api/user`;

class User {
  constructor() {}

  async fetch(walletAddress: string) {
    if (!walletAddress) {
      console.log("account is ", walletAddress);
      Router.replace("/login");
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/fetch`, {
        params: {
          address: walletAddress,
        },
      });
      console.log("response data here is ", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update() {}
}

export default new User();
