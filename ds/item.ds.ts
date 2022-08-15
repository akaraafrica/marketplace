import { api } from "../services/apiClient";
import { randStr } from "../utils/helpers/randomStr";
import { getBase64 } from "../utils/helpers/getBase64";

const url = `/api/items`;

class Item {
  nftStorage: any;

  constructor() {}

  async storeNFT(image: any, name: string, description: string) {
    try {
      const body = new FormData();
      body.append("image", image);
      // body.append('name', name);
      // body.append('description', description);
      console.log("raw image here is ", image);
      //  console.log("base64 image here ", await getBase64(image))
      const blob = new Blob([image], image.type);
      const img = URL.createObjectURL(blob);

      console.log("we have blob ", blob);
      console.log("we have createobject url ", img);

      const res = await api.post(`${url}/mint`, {
        image: img,
        name,
        description,
      });
      console.log("resp from upload here ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async createData(data: any, walletAddress: string) {
    const token = randStr(10);

    try {
      const user = await api.get(`api/me`);
      const res = await api.post(url, {
        ...data,
        ownerId: user.data.id,
        tokenId: token,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async updateData(data: any) {
    console.log(data);
    try {
      const res = await api.patch(url, {
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
}

export default new Item();
