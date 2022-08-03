import axios from "axios";
import { IBid } from "../types/bid.interface";

const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN!}/api/bid`;

type route = "purchase" | "placeBid" | "acceptBid";

class Bid {
  async postData(route: route, data: IBid) {
    try {
      const res = await axios.post(baseUrl + "/" + route, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Bid();
