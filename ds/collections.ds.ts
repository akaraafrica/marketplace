import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN!}/api/collections`;

class Collection {
  async getCollections() {
    try {
      const res = await axios.get(baseUrl);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getCollectionById(id: number) {
    try {
      const res = await axios.get(`${baseUrl}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Collection();
