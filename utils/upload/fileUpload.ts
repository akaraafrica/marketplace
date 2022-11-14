import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../lib/firebaseConfig";
export const getFileUploadURL = async (file: any, filepath: string) => {
  try {
    const storageRef = ref(storage, filepath);
    await uploadBytes(storageRef, file);
    let path = await getDownloadURL(storageRef);
    if (file.type.split("/")[0] == "image") {
      let pathArry = path.split("?");
      console.log(pathArry[0] + "_1280x720" + "?" + pathArry[1]);
      return pathArry[0] + "_1280x720" + "?" + pathArry[1];
    } else {
      return path;
    }
  } catch (error) {
    console.log(error);
  }
};
