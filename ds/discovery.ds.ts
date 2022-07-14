import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN!}/api/items`;
class Discovery {
  constructor() {}

  async getData() {
    try {
      const res = await axios.get(baseUrl, {});
      console.log(
        "we have res data here ====================+>>>>>>>>>>>>>>>. ",
        res.data
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Discovery();
