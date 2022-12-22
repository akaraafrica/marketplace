import { data } from "cypress/types/jquery";
import { NextApiRequest, NextApiResponse } from "next";
import { Actions, TriggerAction } from "../../../services/action.service";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const {
        collection,
        name,
        email,
        walletAddress,
        description,
        percentage,
      } = req.body;

      await prisma.collection.update({
        where: {
          id: collection.id,
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
      await TriggerAction({
        action: Actions.NewBeneficiaryNotice,
        user: collection.author,
        title: collection.title,
        emailAddress: email,
        collection,
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

      await prisma.collection.update({
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
                percentage: parseInt(percentage),
              },
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
  if (req.method === "PUT") {
    try {
      const { collection, users } = req.body;
      await prisma.collection.update({
        where: {
          id: collection.id,
        },
        data: {
          beneficiaries: {
            create: users.map((user: any) => ({
              name: user.name,
              email: user.email,
              walletAddress: user.walletAddress,
              description: user.description,
              percentage: user.percentage,
              user: {
                connect: {
                  id: user.id,
                },
              },
            })),
          },
        },
      });
      users.map((user: any) => {
        TriggerAction({
          action: Actions.BeneficiaryNotice,
          user: collection.author,
          title: collection.title,
          emailAddress: user.email,
          collection,
        });
      });
      console.log("Beneficiary added");
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
