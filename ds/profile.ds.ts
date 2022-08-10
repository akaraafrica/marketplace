import { api } from "../services/apiClient";

const url = `/api/user`;

class Profile {
  constructor() {}

  async fetch(id: number) {
    try {
      const res = await api.get(`${url}/${id}`);
      console.log(res);
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
          itemMinOffer: parseFloat(data.itemMinOffer),
          itemMaxOffer: parseFloat(data.itemMaxOffer),
          turnOnNotify: data.turnOnNotify,
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
}
export default new Profile();
