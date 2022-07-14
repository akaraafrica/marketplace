import data from "../data.json";
class Profile {
  constructor() {}

  async getData() {
    return data;
  }
}
export default new Profile();
