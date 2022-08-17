import { api } from "../services/apiClient";
import { randStr } from "../utils/helpers/randomStr";

const url = `/api/collections`;

class Collection {
  async getCollections() {
    try {
      const res = await api.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getCollectionById(id: number) {
    try {
      const res = await api.get(`${url}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async createData(data: any, walletAddress: string) {
    const token = randStr(10);

    try {
      const user = await api.get(`api/me`);
      const res = await api.post(url, {
        ...data,
        items: [...data.items],
        typeId: parseInt(data.type),
        authorId: user.data.id,
        tokenId: token,
      });
      console.log(res);
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
}
export default new Collection();
