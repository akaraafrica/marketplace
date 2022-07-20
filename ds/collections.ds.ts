import axios from "axios";

const baseUrl = `${process.env.NEXT_BASE_URL!}/api/collections`;

class Collection {
  async getData() {
    try {
      const res = await axios.get(baseUrl);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Collection();
