import { api } from "../services/apiClient";
import { IProfile } from "../types/profile.interface";
import { IUser } from "../types/user.interface";

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
  async follow(profile: IProfile, user: IUser) {
    try {
      const response = await api.post(`${url}/follow`, {
        ownerId: profile.id,
        userId: user.id,
        notificationTitle: ` ${
          user.profile?.name || user.walletAddress.slice(0, 6)
        }  follows you`,
      });
      return response.data;
    } catch (error) {}
  }
}

export default new User();
