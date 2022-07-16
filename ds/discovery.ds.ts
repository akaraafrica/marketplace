import axios from "axios";

export const enum Filter {
  All = 0,
  Art = 1,
  Game = 2,
  Photography = 3,
  Music = 4,
  Video = 5,
}
const baseUrl = `${process.env.NEXT_BASE_URL!}/api/items`;
class Discovery {
  constructor() {}

  async getData(filterBy: Filter) {
    try {
      const res = await axios.get(baseUrl, {
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
