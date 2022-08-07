import { api } from "../services/apiClient";

const url = `/api/upload`;

class Upload {
  async postData(file: any) {
    const name = file.name;
    const type = file.type;
    try {
      const res = await api.post(url, { name, type });
      console.log(res.data);

      const response = await fetch(res.data, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      });

      const imageUrl = url.split("?")[0];
      console.log(imageUrl);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Upload();
