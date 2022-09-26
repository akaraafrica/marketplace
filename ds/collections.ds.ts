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
      throw new Error("error");
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
  async sendRequestToContributors(data: any) {
    try {
      const res = await api.post(url + "/request", {
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
}
export default new Collection();
