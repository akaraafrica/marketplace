import { api } from "../services/apiClient";
import { IItem } from "../types/item.interface";
import { IUser } from "../types/user.interface";

const url = `/api/collections`;

class Collection {
  async getCollections() {
    try {
      const res = await api.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getUserCollections(id: number) {
    try {
      const res = await api.get(`${url}/userCollections?id=${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getCollectionById(id: number) {
    try {
      const res = await api.get(`${url}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async createData(data: any, user: IUser, walletAddress: string) {
    try {
      const res = await api.post(url, {
        data,
        user,
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      throw new Error("error");
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
  async sendRequestToContributors(data: any) {
    try {
      const res = await api.post(url + "/request", {});
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async updateLunchTime(data: any) {
    try {
      const res = await api.post(url + "/update", {
        ...data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async updateStatus(data: any) {
    try {
      const res = await api.post(url + "/status", {
        ...data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async payout(data: any) {
    try {
      const res = await api.post(url + "/update", {
        ...data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async updateCollection(data: any) {
    try {
      const res = await api.patch(url + "/update", {
        ...data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async search(text: string) {
    try {
      const res = await api.post(url + "/search", {
        text,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async removeContributor(id: number, contributorId: number, items: IItem[]) {
    try {
      const res = await api.put("/api/contributor/remove", {
        id,
        contributorId,
        items: items,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async addItem({ user, item, collection }: any) {
    try {
      const res = await api.patch(url + "/addItem", {
        user,
        item,
        collection,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async addBeneficiary(collectionId: number, data: any) {
    try {
      const res = await api.post(url + "/beneficiary", {
        collectionId,
        ...data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async updateBeneficiary(collectionId: number, data: any) {
    try {
      const res = await api.patch(url + "/beneficiary", {
        collectionId,
        ...data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async removeBeneficiary(data: any) {
    try {
      const res = await api.delete(url + "/beneficiary", {
        data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Collection();
