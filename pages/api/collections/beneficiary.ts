import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const {
        collectionId,
        name,
        email,
        walletAddress,
        description,
        percentage,
      } = req.body;

      await prisma.collection.update({
        where: {
          id: collectionId,
        },
        data: {
          beneficiaries: {
            create: {
              name: name,
              email: email,
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
  if (req.method === "PATCH") {
    try {
      const {
        collectionId,
        name,
        email,
        walletAddress,
        description,
        percentage,
        id,
      } = req.body;

      const item = await prisma.collection.update({
        where: {
          id: collectionId,
        },
        data: {
          beneficiaries: {
            update: {
              where: {
                id: id,
              },
              data: {
                name: name,
                email: email,
                walletAddress: walletAddress,
                description: description,
                percentage: percentage,
              },
            },
          },
        },
      });
      console.log("Beneficiary added");
      console.log({ item });

      res.status(200).json("Beneficiary added");
    } catch (error) {
      console.log(error);
      res.status(400).json("error adding Beneficiary");
    }
  }
  if (req.method === "DELETE") {
    try {
      const { collectionId, id } = req.body;

      await prisma.collection.update({
        where: {
          id: collectionId,
        },
        data: {
          beneficiaries: {
            delete: {
              id,
            },
          },
        },
      });
      res.status(200).json("Beneficiary removed");
    } catch (error) {
      console.log(error);
      res.status(400).json("error removing Beneficiary");
    }
  }
  res.status(402);
};

export default handler;
