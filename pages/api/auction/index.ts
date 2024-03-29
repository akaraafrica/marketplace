import { NextApiRequest, NextApiResponse } from "next";
import createQueue from "../../../utils/helpers/createQueue";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `https://${req.headers.host}/api/auction/auctionEnd`;
  if (req.method === "POST") {
    try {
      const data = await prisma.auction.create({
        data: {
          itemId: req.body.itemId,
          open: true,
          openPrice: req.body.startPrice,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
        },
      });
      await createQueue(url, req.body.itemId, req.body.endTime, data.id);
      console.log("queue added success");
      res.status(200).json("auction added");
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }
  if (req.method === "PATCH") {
    try {
      const data = await prisma.auction.update({
        where: {
          id: req.body.id,
        },
        data: {
          open: true,
          openPrice: req.body.startPrice,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
        },
      });
      await createQueue(url, req.body.id, req.body.endTime, data.id);
      console.log("queue added success");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const data = await prisma.auction.delete({
        where: {
          id: req.body.id,
        },
      });
      console.log("auction deleted");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }
}
