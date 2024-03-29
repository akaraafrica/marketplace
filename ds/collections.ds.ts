import { IUser } from "./../types/user.interface";
import { api } from "../services/apiClient";
import { IItem } from "../types/item.interface";

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
      let { data } = await api.get(`${url}/${id}`);
      data = data.data;
      data = {
        ...data,
        items: data?.items.length > 0 ? data?.items : data.draftItems,
      };

      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async removeItem(collectionId: number, itemId: number, draft?: string) {
    try {
      const res = await api.patch(`${url}/removeItem`, {
        collectionId,
        itemId,
        draft,
      });
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
      // console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      throw new Error("error");
    }
  }
  async updateData(data: any) {
    // console.log(data);
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
        items,
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
  async addBeneficiary(collection: any, data: any) {
    try {
      const res = await api.post(url + "/beneficiary", {
        collection,
        ...data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async connectBeneficiary(collection: any, users: IUser[]) {
    try {
      const res = await api.put(url + "/beneficiary", {
        collection,
        users,
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

  async getPage(page: any) {
    try {
      const res = await api.get(url + "/getpage?page=" + page);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Collection();
