import { api } from "../services/apiClient";
import { IBid } from "../types/bid.interface";
import { IItem } from "../types/item.interface";
import { IUser } from "../types/user.interface";

const url = `/api/bid`;

type route = "purchase" | "placeBid";

class Bid {
  async postData(
    route: route,
    item: IItem,
    user: IUser,
    amount?: number,
    bid?: IBid
  ) {
    try {
      const res = await api.post(url + "/" + route, {
        item,
        user,
        bid,
        amount,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Bid();
