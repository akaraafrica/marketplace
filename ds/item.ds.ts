import axios from "axios";
const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN!}/api/items`;

class Item {
  constructor() {}

  async creatData(data: any) {
    try {
      await axios.post(baseUrl, {
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Item();
