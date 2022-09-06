import axios from "axios";
import { api } from "../services/apiClient";
import { IUser } from "../types/user.interface";

const url = `/api/items`;

class Item {
  async storeNFT(image: any, name: string, description: string) {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: any) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };
    const formData = {
      image,
      name,
      description,
    };
    try {
      const res = await axios.post(url + "/nftStorage", formData, config);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async createData(data: any, user: IUser) {
    try {
      const res = await api.post(url, { item: data, user });
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async updateData(data: any) {
    try {
      const res = await api.patch(url, {
        ...data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async updateItem(data: any) {
    console.log(data);
    try {
      const res = await api.patch(`${url}/update`, {
        ...data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async getData() {
    try {
      const items = await api.get(url);
      return items.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getMore(lastIndex: number) {
    try {
      const items = await api.get(`${url}/fetchmore?lastIndex=${lastIndex}`);
      return items.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Item();
