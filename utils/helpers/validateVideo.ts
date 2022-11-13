import { toast } from "react-toastify";

const validateVideo = (file: File) => {
  const MAX_VIDEO_SIZE = 20971520; // 20MB
  const FILE_TYPES = ["video/mp4", "video/avi", "video/ogg", "video/webm"];
  if (!FILE_TYPES.includes(file.type)) {
    toast.error("File type is not supported");
    return false;
  }
  if (file.size > MAX_VIDEO_SIZE) {
    toast.error("File size is too big");
    return false;
  }
  return true;
};

export default validateVideo;
