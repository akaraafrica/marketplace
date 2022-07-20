import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN!}/api/items`;

class Item {
  constructor() {}

  async createData(data: any, walletAddress: string, tokenid: string) {
    try {
      const user = await axios.get(`api/user/${walletAddress}`);
      await axios.post(baseUrl, {
        ...data,
        owner: user.data,
        ownerId: user.data.id,
        tokenid: tokenid,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Item();
