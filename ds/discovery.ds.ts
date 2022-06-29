import data from "../data.json";

class Discovery {
  constructor() {}

  async getData() {
    return data;
  }
}

export default new Discovery();
