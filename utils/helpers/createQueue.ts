import axios from "axios";
import { differenceInSeconds } from "date-fns";

export default async function createQueue(
  url: string,
  itemId: string,
  endTime: string,
  auctionId: number
) {
  console.log("createQueue", itemId, endTime, auctionId);
  const seconds = differenceInSeconds(new Date(endTime), new Date());
  console.log(seconds);
  try {
    return await axios.post(
      "https://us-central1-akara-marketplace.cloudfunctions.net/enqueueTasks",
      {
        url,
        itemId,
        endTime: seconds,
        auctionId,
      }
    );
  } catch (error) {
    console.log("error", error);
  }
}
