import { getCookie } from "cookies-next";
import { api } from "../../services/apiClient";

export const getFileUploadURL = async (file: any, fileName: string) => {
  try {
    const address = getCookie("address") as string;
    const key = address?.slice(1, 6) + "/" + fileName;

    const res = await api.post("/api/s3", { key });

    const { fields, url } = res.data;

    const data = {
      bucket: "ak-marketplace",
      ...fields,
      "Content-Type": file.type,
      file: file,
    };
    console.log(data);

    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    console.log(response);

    // await fetch(data, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   },
    //   body: file
    // })
    // const imageUrl = data.split('?')[0]
    // console.log(imageUrl)
    // const url = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${Key}`;
    // return url;
  } catch (error) {
    console.log(error);
  }
};
