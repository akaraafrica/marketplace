import prisma, { Prisma } from "../../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { ParsePrismaError } from "../../../../utils/helpers/prisma.error";
import exclude from "../../../../utils/helpers/excludePassword";
import { IUser } from "../../../../types/user.interface";

export default async function Fetch(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const id = parseInt(req.query.id as string);

    if (!id) return res.status(404);
    try {
      const bids = await prisma.bid.findMany({
        where: {
          item: {
            ownerId: id,
          },
        },
        include: {
          item: true,
          user: {
            select: {
              walletAddress: true,
              profile: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
        include: {
          profile: true,
          collections: {
            include: {
              contributors: {
                where: {
                  userId: id,
                },
              },
            },
          },
          likes: {
            include: { item: true },
          },
          items: {
            include: {
              auction: true,
              purchases: true,
            },
          },
        },
      });
      const mindtedItems = await prisma.item.findMany({
        where: {
          authorId: id,
        },
        include: {
          purchases: {
            include: {
              user: true,
            },
          },
          owner: true,
        },
      });
      const TotalMintedSold = await prisma.purchase.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          itemPrevOwnerId: id,
        },
      });
      const TotalAuctionSold = await prisma.purchase.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          itemPrevOwnerId: id,
          isAuction: true,
        },
      });
      const TotalCollectionSold = await prisma.purchase.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          itemPrevOwnerId: id,
          inCollectionId: true,
        },
      });

      // @ts-ignore: Unreachable code error
      const userWithoutPassword = exclude(user, "password");
      const { items, collections, likes } = userWithoutPassword as any;
      return res.status(200).json({
        items,
        collections,
        likes,
        bids,
        mindtedItems,
        TotalMintedSold,
        TotalAuctionSold,
        TotalCollectionSold,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).send(ParsePrismaError(error));
      }
      return res.status(400).json(error);
    }
  }
}
