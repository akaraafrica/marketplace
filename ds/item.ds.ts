import { NFTStorage, File } from "nft.storage";
import { api } from "../services/apiClient";
import { IUser } from "../types/user.interface";
import { randStr } from "../utils/helpers/randomStr";

const url = `/api/items`;

class Item {
  nftStorage: any;

  constructor() {
    this.nftStorage = new NFTStorage({
      token: process.env.NFT_STORAGE_KEY || "",
    });
  }

  async storeNFT(image: any, name: string, description: string) {
    // load the file from disk
    // const image = await fileFromPath(imagePath)
    // create a new NFTStorage client using our API key
    // call client.store, passing in the image & metadata

    const resp = await this.nftStorage.store({
      image,
      name,
      description,
    });
    console.log("created nft data ==> ", resp);
    return resp;
  }
  async createData(data: any, user: IUser, walletAddress: string) {
    try {
      const res = await api.post(url, { item: data, user });
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
