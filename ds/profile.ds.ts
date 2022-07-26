import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_DOMAIN!}/api/`;

class Profile {
  constructor() {}

  async fetch(address: string) {
    try {
      const res = await axios.get(`${baseUrl}/${address}`);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateData(data: any, address: string, accessToken: string, user: any) {
    try {
      const res = await axios.put(`${baseUrl}profile/${address}`, {
        method: "PUT",
        // headers: {
        //   authorization: `Bearer ${accessToken}`,
        // },
        body: JSON.stringify({
          address: address,
          name: data.name,
          user: data.user,
        }),
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new Profile();
