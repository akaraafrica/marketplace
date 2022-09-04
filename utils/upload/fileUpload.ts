import { getCookie } from "cookies-next";
import { api } from "../../services/apiClient";

export const getFileUploadURL = async (file: any, filepath: string) => {
  try {
    const key = filepath;

    const res = await api.post("/api/s3", { key });

    await fetch(res.data, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });
    const url = res.data.split("?")[0];
    return url;
  } catch (error) {
    console.log(error);
  }
};
