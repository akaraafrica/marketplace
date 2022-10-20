import { api } from "../services/apiClient";

const url = `/api/contributor`;

class Contributor {
  async sendNotifications(data: any) {
    try {
      const res = await api.post(url + "/sendmails", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async updatePercentage(data: any) {
    try {
      const res = await api.put(url + "/percentage", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async updateStatus(data: any) {
    try {
      const res = await api.put(url + "/status", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteContributor(data: any) {
    try {
      const res = await api.delete(url + "/delete", { data });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Contributor();
