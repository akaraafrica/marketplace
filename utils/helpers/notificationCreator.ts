import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  title: string;
  content: string;
  userId: string;
}
const createNotification = async ({ title, content, userId }: Data) => {
  try {
    await axios.post(`${process.env.NEXT_BASE_URL}/api/notifications/create`, {
      title,
      content,
      userId,
    });
    return;
  } catch (error) {
    console.log(error);
  }
};

export default createNotification;
