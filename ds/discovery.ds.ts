import axios from "axios";

class Discovery {
  constructor() {}

  async getData() {
    const res = await axios(`${process.env.NEXT_BASE_URL}api/items`, {
      method: "GET",
    });
    return res.data.data;
  }
}

export default new Discovery();
