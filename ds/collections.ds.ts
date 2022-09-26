import { api } from "../services/apiClient";
import { IUser } from "../types/user.interface";

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
  async getUserCollections(id: number) {
    try {
      const res = await api.get(`${url}/userCollections?id=${id}`);
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
  async createData(data: any, user: IUser, walletAddress: string) {
    try {
      const res = await api.post(url, {
        data,
        user,
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
  async updateLunchTime(data: any) {
    try {
      const res = await api.post(url + "/update", {
        ...data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async payout(data: any) {
    try {
      const res = await api.post(url + "/update", {
        ...data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async updateCollection(data: any) {
    try {
      const res = await api.patch(url + "/update", {
        ...data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async addItem({ user, item, collection }: any) {
    try {
      const res = await api.patch(url + "/addItem", {
        user,
        item,
        collection,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Collection();
