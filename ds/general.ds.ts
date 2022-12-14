import { api } from "../services/apiClient";

const url = "/api/general";
class General {
  async search(text: string) {
    try {
      const res = await api.post(url, {
        text,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new General();
