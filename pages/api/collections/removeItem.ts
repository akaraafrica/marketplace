import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionId, itemId, draft } = req.body;
  console.log({
    collectionId,
    itemId,
    draft,
  });
  if (draft) {
    if (req.method === "PATCH") {
      const data = await prisma.collection.update({
        where: {
          id: collectionId,
        },
        data: {
          draftItems: {
            delete: {
              id: itemId,
            },
          },
        },
      });
      console.log("Item removed ");

      res.status(200).json({ data });
    }
  }
  if (req.method === "PATCH") {
    const data = await prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        items: {
          disconnect: {
            id: itemId,
          },
        },
      },
    });
    console.log("Item removed ");

    res.status(200).json({ data });
  }
};

export default handler;
