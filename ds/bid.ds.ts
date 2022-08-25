import { api } from "../services/apiClient";
import { IItem } from "../types/item.interface";
import { IUser } from "../types/user.interface";

const url = `/api/bid`;

type route = "purchase" | "placeBid" | "acceptBid";

class Bid {
  async postData(route: route, item: IItem, user: IUser, amount?: number) {
    try {
      const res = await api.post(url + "/" + route, { item, user, amount });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Bid();
