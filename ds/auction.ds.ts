import { api } from "../services/apiClient";

const url = `/api/auction`;

class Auction {
  async postData(data: any) {
    try {
      const res = await api.post(url, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async updateData(data: any) {
    try {
      const res = await api.patch(url, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteData(data: any) {
    try {
      const res = await api.delete(url, { data });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Auction();
