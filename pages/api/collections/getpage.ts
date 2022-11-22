import { forEach } from "cypress/types/lodash";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const page = Number(req.query.page) || 0;
      const data = await prisma.$transaction([
        prisma.collection.count(),
        prisma.collection.findMany({
          skip: (page === 1 ? 0 : page - 1) * 6,
          take: 6,
          // cursor: {
          //   id: 6,
          // },
          include: {
            author: {
              include: {
                profile: true,
              },
            },
            draftItems: true,
            items: true,
            ratings: true,
          },
          orderBy: {
            id: "asc",
          },
        }),
      ]);

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
