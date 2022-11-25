import { toast } from "react-toastify";

const validateImage = (file: File) => {
  const MAX_IMAGE_SIZE = 5121593; // 5MB
  const FILE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/webp",
  ];
  if (!FILE_TYPES.includes(file?.type)) {
    toast.error("File type is not supported");
    return false;
  }
  if (file?.size > MAX_IMAGE_SIZE) {
    toast.error("File size is too big");
    return false;
  }
  return true;
};

export default validateImage;
