import { api } from "../services/apiClient";
import data from "../data.json";

interface CreateNotificationData {
  title: string;
  content: string;
  userId: string;
}

const url = `/api/notifications`;

class Notifications {
  constructor() {}

  async fetch(token: string, walletAddress: string) {
    try {
      const resp = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { address: walletAddress },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateAll(token: string, walletAddress: string) {
    try {
      const resp = await api.put(`${url}/updateAll`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address: walletAddress }),
      });
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, walletAddress: string, token: string) {
    try {
      const resp = await api.put(`${url}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        address: walletAddress,
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
