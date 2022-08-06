import axios from "axios";
import { api } from "../services/apiClient";

const url = `/api/bid`;

type route = "purchase" | "placeBid" | "acceptBid";

class Bid {
  async postData(route: route, data: any) {
    try {
      const res = await api.post(url + "/" + route, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Bid();
