import { data } from "cypress/types/jquery";
import { api } from "../services/apiClient";

const url = `/api/user`;

class Profile {
  constructor() {}

  async fetch(id: number) {
    try {
      const res = await api.get(`${url}/${id}/profile`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async fetchProfile(username: string) {
    try {
      const res = await api.get(`${url}/profile/${username}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async fetchSettings(id: number) {
    try {
      const res = await api.get(`/api/settings/${id}`);
      console.log("settings", res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getDashboradData(id: number) {
    try {
      const res = await api.get(`${url}/${id}/dashboard`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async updateData(data: any, id: number, accessToken: string) {
    try {
      await api.put(
        `${url}profile/${id}`,
        {
          name: data.name,
          bio: data.bio,
          phoneNumber: data.phoneNumber,
          website: data.website,
          twitter: data.twitter,
          facebook: data.facebook,
          instagram: data.instagram,
          // itemMinOffer: parseFloat(data.itemMinOffer),
          // itemMaxOffer: parseFloat(data.itemMaxOffer),
          // turnOnNotify: data.turnOnNotify,
          id: id,
        },
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async updateSettingsData(data: any, id: number, accessToken: string) {
    try {
      await api.patch(
        `/api/settings/${id}`,
        {
          ...data,
          id: id,
        },
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Profile();
