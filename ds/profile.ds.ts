import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN!}/api/user`;

class Profile {
  constructor() {}

  async fetch(address: number) {
    try {
      const res = await axios.get(`${baseUrl}/${address}`, {
        method: "GET",
      });
      console.log(res);
      return res.data;
    } catch (error) {}
  }
}
export default new Profile();
