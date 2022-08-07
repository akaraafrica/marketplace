import uploadDs from "../../ds/upload.ds";

export const getFileUploadURL = async (file: any) => {
  const res = await uploadDs.postData(file);
  return res;
};
