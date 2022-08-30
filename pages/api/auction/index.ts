import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.body);

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
      console.log("auction added");

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }
  if (req.method === "PATCH") {
    console.log(req.body);
    try {
      const data = await prisma.auction.update({
        where: {
          id: req.body.id,
        },
        data: {
          open: true,
          itemId: req.body.itemId,
          openPrice: req.body.startPrice,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
        },
      });
      console.log("auction updated");

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.json({
        error: "There was an error",
      });
    }
  }

  if (req.method === "DELETE") {
    console.log(req.body);

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
