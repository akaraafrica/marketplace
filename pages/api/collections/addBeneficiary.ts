import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    try {
      const { collectionId, name, walletAddress, description, percentage } =
        req.body;

      await prisma.collection.update({
        where: {
          id: collectionId,
        },
        data: {
          beneficiaries: {
            create: {
              name: name,
              walletAddress: walletAddress,
              description: description,
              percentage: percentage,
            },
          },
        },
      });
      console.log("Beneficiary added");

      res.status(200).json("Beneficiary added");
    } catch (error) {
      console.log(error);
      res.status(400).json("error adding Beneficiary");
    }
  }
  res.status(402);
};

export default handler;
