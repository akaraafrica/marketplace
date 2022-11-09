import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../lib/firebaseConfig";
export const getFileUploadURL = async (file: any, filepath: string) => {
  try {
    const storageRef = ref(storage, filepath);
    await uploadBytes(storageRef, file);
    const path = await getDownloadURL(storageRef);
    console.log(path);
    return path;
  } catch (error) {
    console.log(error);
  }
};
