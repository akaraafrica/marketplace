import axios from "axios";
import { ILike } from "../types/like.interface";

const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN!}/api/like`;

class Like {
  async postData(data: ILike) {
    try {
      const res = await axios.post(baseUrl, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Like();
