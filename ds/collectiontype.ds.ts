import { api } from "../services/apiClient";

const url = `/api/collectionstype`;

class CollectionType {
  async fetchAll() {
    try {
      const res = await api.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new CollectionType();
