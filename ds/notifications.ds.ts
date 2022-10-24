import { api } from "../services/apiClient";

interface CreateNotificationData {
  title: string;
  content: string;
  userId: string;
}

const url = `/api/notifications`;

class Notifications {
  constructor() {}

  async fetch(id: number) {
    try {
      const resp = await api.get(`${url}/${id}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
  async fetchAll(id: number) {
    try {
      const resp = await api.get(`${url}/${id}?all=true`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateAll(walletAddress: string) {
    try {
      const resp = await api.put(`${url}/updateAll`, { walletAddress });
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, walletAddress: string) {
    try {
      const resp = await api.put(`${url}/${id}`, {
        walletAddress,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }

  async create({ title, content, userId }: CreateNotificationData) {
    try {
      const resp = await api.post(`${url}/create`, {
        title,
        content,
        userId,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Notifications();
