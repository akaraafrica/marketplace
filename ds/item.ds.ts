import { api } from "../services/apiClient";
import { randStr } from "../utils/helpers/randomStr";

const url = `/api/items`;

class Item {
  constructor() {}

  async createData(data: any, walletAddress: string) {
    const token = randStr(10);

    try {
      const user = await api.get(`api/me`);
      const res = await api.post(url, {
        ...data,
        ownerId: user.data.id,
        tokenId: token,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async updateData(data: any) {
    console.log(data);
    try {
      const res = await api.patch(url, {
        ...data,
      });
      return res;
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
