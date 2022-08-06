import { api } from "../services/apiClient";
import { ILike } from "../types/like.interface";

const url = `/api/like`;

class Like {
  async postData(data: ILike) {
    try {
      const res = await api.post(url, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Like();
