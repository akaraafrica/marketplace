import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN!}/api/upload`;

class Upload {
  constructor() {}

  async uploadItem(file: any) {
    try {
      const res = await axios.post(`${baseUrl}/`,file);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Upload();
