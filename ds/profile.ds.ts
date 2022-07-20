import axios from "axios";

const baseUrl = `${process.env.NEXT_BASE_URL!}api/user`;

class Profile {
  constructor() {}

  async fetch(id: number) {
    try {
      const res = await axios.get(`${baseUrl}/${id}`, {
        method: "GET",
      });
      console.log(res);
      return res.data;
    } catch (error) {}
  }
}
export default new Profile();
