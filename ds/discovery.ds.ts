import axios from "axios";
import { api } from "../services/apiClient";

export const enum Filter {
  All = 0,
  Art = 1,
  Game = 2,
  Photography = 3,
  Music = 4,
  Video = 5,
}
const url = `/api/items`;

class Discovery {
  constructor() {}

  async getData(filterBy: Filter) {
    try {
      const res = await api.get(url, {
        params: {
          filterBy,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Discovery();
