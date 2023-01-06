import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const priceRange = req.query.priceRange;
  const sort = req.query.sort as
    | "Most liked"
    | "Least liked"
    | "Highest price"
    | "Lowest price"
    | "Recently added"
    | "First added";
  const verifiedCreator = req.query.verifiedCreator as unknown as string;

  const category = req.query.category as unknown as any;
  const page =
    Number(req?.query?.page) === 0 ? 0 : Number(req?.query?.page) - 1;

  let orderBy: any;

  switch (sort) {
    case "Most liked":
      orderBy = { likes: { _count: "desc" } };
      break;
    case "Least liked":
      orderBy = { likes: { _count: "asc" } };
      break;
    case "Highest price":
      orderBy = { price: "desc" };
      break;
    case "Lowest price":
      orderBy = { price: "asc" };
      break;
    case "Recently added":
      orderBy = { createdAt: "desc" };
      break;
    case "First added":
      orderBy = { createdAt: "asc" };
      break;
  }

  const where: any = {
    published: true,
    price: {
      lte: Number(priceRange) || 0,
    },
  };

  if (category !== "ALL") {
    where.category = category;
  }
  if (verifiedCreator.toLocaleLowerCase() !== "all") {
    where.owner = { verified: verifiedCreator.toLowerCase() === "true" };
  }

  try {
    const data = await prisma.$transaction([
      prisma.item.count({ where }),
      prisma.item.findMany({
        take: 6,
        include: {
          likes: true,
        },
        where,
        orderBy,
        skip: page * 6 || 0,
      }),
    ]);
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "error" });
  }
};

export default handler;
