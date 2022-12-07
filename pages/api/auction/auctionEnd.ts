import { NextApiRequest, NextApiResponse } from "next";
import { Actions, TriggerAction } from "../../../services/action.service";
import { randStr } from "../../../utils/helpers/randomStr";
import prisma from "../../../utils/lib/prisma";

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req.body", req.body);

  try {
    const data = JSON.parse(req.body);

    console.log("data", data);

    const item = await prisma.item.findUnique({
      where: {
        id: data.itemId,
      },
      include: {
        bids: {
          orderBy: {
            amount: "desc",
          },
          include: {
            user: true,
          },
        },
      },
    });
    if (item) {
      const bid = item.bids[0];

      console.log("bid", bid);

      const createPurchase = prisma.purchase.create({
        data: {
          amount: bid.amount,
          userId: bid.bidderId,
          transactionId: randStr(10),
          itemId: item.id,
          itemPrevOwnerId: item.ownerId,
          isAuction: true,
          inCollectionId: !!item?.collectionId,
        },
      });
      const updateItemOwner = prisma.item.update({
        where: {
          id: item.id,
        },
        data: {
          ownerId: bid.bidderId,
          acceptedBid: 1,
          updatedAt: new Date(),
        },
      });
      const deleteBids = prisma.bid.deleteMany({
        where: {
          itemId: item.id,
        },
      });
      const deleteAuction = prisma.auction.delete({
        where: {
          itemId: item.id,
        },
      });
      await prisma.$transaction([
        deleteBids,
        deleteAuction,
        updateItemOwner,
        createPurchase,
      ]);
      await TriggerAction({
        action: Actions.wonBid,
        user: bid.user as any,
        item: item as any,
        bidAmount: bid.amount,
      });
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.log("error", error);
  }
}
