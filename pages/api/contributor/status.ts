import prisma, { Prisma } from "../../../utils/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { ParsePrismaError } from "../../../utils/helpers/prisma.error";
import { Actions, TriggerAction } from "../../../services/action.service";

export default async function Fetch(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id, status } = req.body;

    if (!id) return res.status(404);
    try {
      const resp = await prisma.contributor.update({
        where: {
          id: id,
        },
        data: {
          confirmation: status,
        },
      });
      const collection = await prisma.collection.findFirst({
        where: {
          id: resp.collectionId,
        },
        include: {
          contributors: true,
        },
      });
      const user = await prisma.user.findFirst({
        where: {
          id: resp.userId,
        },
        select: {
          id: true,
          profile: true,
          walletAddress: true,
        },
      });
      await TriggerAction({
        action: Actions.ContributorAction,
        user: user as any,
        collection: collection as any,
        contributorStatus: status,
      });
      const allApprove = collection?.contributors.every(
        (contributor) => contributor.confirmation === "ACCEPTED"
      );
      if (allApprove) {
        await TriggerAction({
          action: Actions.CollectionApproved,
          user: user as any,
          collection: collection as any,
        });
      }
      console.log("contributor status updated");
      return res.status(200).send("contributor status updated");
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).send(ParsePrismaError(error));
      }
      return res.status(400).json(error);
    }
  }
}
