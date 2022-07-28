import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN!}/api/user`;

class Profile {
  constructor() {}

  async fetch(id: number) {
    try {
      const res = await axios.get(`${baseUrl}/${id}`);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Profile();
