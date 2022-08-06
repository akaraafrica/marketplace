import { api } from "../services/apiClient";

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
}
export default new Collection();
