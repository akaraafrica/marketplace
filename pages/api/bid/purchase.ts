import { NextApiRequest, NextApiResponse } from "next";
import {
  Actions,
  ItemType,
  TriggerAction,
} from "../../../services/action.service";
import { randStr } from "../../../utils/helpers/randomStr";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user, item } = req.body;

    try {
      const createPurchase = prisma.purchase.create({
        data: {
          amount: item.price,
          userId: user.id,
          itemPrevOwnerId: item.ownerId,
          transactionId: randStr(10),
          itemId: item.id,
          inCollectionId: !!item?.inCollectionId,
        },
      });

      const updateItemOwner = prisma.item.update({
        where: {
          id: item.id,
        },
        data: {
          ownerId: user.id,
          acceptedBid: 1,
          updatedAt: new Date(),
          published: false,
          collectionOnChain: false,
        },
      });
      try {
        await prisma.bid.deleteMany({
          where: {
            itemId: req.body.itemId,
          },
        });
      } catch (error) {
        console.log("error");
      }
      try {
        await prisma.auction.delete({
          where: {
            itemId: item.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
      try {
        await prisma.$transaction([updateItemOwner, createPurchase]);

        if (item.collectionId && item.collectionOnChain) {
          const collection = await prisma.collection.findUnique({
            where: {
              id: item.collectionId,
            },
          });
          await prisma.collection.update({
            where: {
              id: item.collectionId,
            },
            data: {
              revenue: collection?.revenue + item.price,
            },
          });
        }
        console.log("revenue updated");
        await TriggerAction({
          action: Actions.Purchase,
          user,
          item,
        });
      } catch (error) {
        console.log(error);
        res.status(400).json("error");
      }
      res.status(200).json("successful");
    } catch (error) {
      console.log(error);
      res.status(400).json("error");
      res.json({
        error: "There was an error",
      });
    }
  }
}
