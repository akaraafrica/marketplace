import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN!}/api/user`;

class Profile {
  constructor() {}

  async fetch(address: string) {
    try {
      const res = await axios.get(`${baseUrl}/${address}`);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Profile();
