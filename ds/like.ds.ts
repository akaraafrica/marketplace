import { api } from "../services/apiClient";
import { IItem } from "../types/item.interface";
import { IUser } from "../types/user.interface";

const url = `/api/like`;

class Like {
  async postData(item: IItem, user: IUser) {
    try {
      const res = await api.post(url, { user, item });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Like();
