import { api } from "../services/apiClient";

const url = `/api/items`;

class Item {
  constructor() {}

  async createData(data: any, walletAddress: string, tokenid: string) {
    try {
      const user = await api.get(`api/user/${walletAddress}`);
      await api.post(url, {
        ...data,
        owner: user.data,
        ownerId: user.data.id,
        tokenid: tokenid,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async getData() {
    try {
      const items = await api.get(url);
      return items.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Item();
