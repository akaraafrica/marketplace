import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("fiter");
  console.log(req.query);

  if (req.method === "GET") {
    // const lastIndex = Number(req.query.lastIndex) + 1;
    const priceRange = req.query.priceRange;
    const sort = req.query.sort as
      | "Most liked"
      | "Least liked"
      | "Highest price"
      | "Lowest price"
      | "Recently added"
      | "First added";
    const verifiedCreator = req.query.verifiedCreator as unknown as string;
    const category = req.query.category as unknown as any; // console.log("fetchmore");
    const page =
      Number(req?.query?.page) === 0 ? 0 : Number(req?.query?.page) - 1;

    if (sort === "Most liked") {
      if (category === "ALL") {
        try {
          const data = await prisma.$transaction([
            prisma.item.count({
              where: {
                published: true,
                price: {
                  lte: Number(priceRange),
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
              },
            }),
            prisma.item.findMany({
              take: 6,
              include: {
                likes: true,
              },
              where: {
                published: true,
                price: {
                  lte: Number(priceRange),
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
              },
              orderBy: {
                likes: {
                  _count: "desc",
                },
              },
              skip: page * 6 || 0,
            }),
          ]);
          console.log(data);

          return res.status(200).json(data);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      } else {
        try {
          const data = await prisma.$transaction([
            prisma.item.count({
              where: {
                published: true,

                price: {
                  lte: Number(priceRange) || 0,
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
                category: category,
              },
            }),
            prisma.item.findMany({
              take: 6,
              include: {
                likes: true,
              },
              where: {
                published: true,

                price: {
                  lte: Number(priceRange) || 0,
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
                category: category,
              },
              orderBy: {
                likes: {
                  _count: "desc",
                },
              },
              skip: page * 6 || 0,
            }),
          ]);
          console.log(data);

          return res.status(200).json(data);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      }
    }
    if (sort === "Least liked") {
      if (category === "ALL") {
        try {
          const data = await prisma.$transaction([
            prisma.item.count({
              where: {
                published: true,

                price: {
                  lte: Number(priceRange),
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
              },
            }),
            prisma.item.findMany({
              take: 6,
              include: {
                likes: true,
              },
              where: {
                published: true,

                price: {
                  lte: Number(priceRange),
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
              },
              orderBy: {
                likes: {
                  _count: "asc",
                },
              },
              skip: page * 6 || 0,
            }),
          ]);

          return res.status(200).json(data);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      } else {
        try {
          const data = await prisma.$transaction([
            prisma.item.count({
              where: {
                published: true,

                price: {
                  lte: Number(priceRange) || 0,
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
                category: category,
              },
            }),
            prisma.item.findMany({
              take: 6,
              include: {
                likes: true,
              },
              where: {
                published: true,

                price: {
                  lte: Number(priceRange) || 0,
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
                category: category,
              },
              orderBy: {
                likes: {
                  _count: "asc",
                },
              },
              skip: page * 6 || 0,
            }),
          ]);
          return res.status(200).json(data);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      }
    }
    if (sort === "Highest price") {
      if (category === "ALL") {
        try {
          const data = await prisma.$transaction([
            prisma.item.count({
              where: {
                published: true,

                price: {
                  lte: Number(priceRange),
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
              },
            }),
            prisma.item.findMany({
              take: 6,
              include: {
                likes: true,
              },
              where: {
                published: true,

                price: {
                  lte: Number(priceRange),
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
              },
              orderBy: {
                price: "desc",
              },
              skip: page * 6 || 0,
            }),
          ]);

          return res.status(200).json(data);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      } else {
        try {
          const data = await prisma.$transaction([
            prisma.item.count({
              where: {
                published: true,

                price: {
                  lte: Number(priceRange) || 0,
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
                category: category,
              },
            }),
            prisma.item.findMany({
              take: 6,
              include: {
                likes: true,
              },
              where: {
                published: true,

                price: {
                  lte: Number(priceRange) || 0,
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
                category: category,
              },
              orderBy: {
                price: "desc",
              },
              skip: page * 6 || 0,
            }),
          ]);
          return res.status(200).json(data);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      }
    }
    if (sort === "Lowest price") {
      if (category === "ALL") {
        try {
          const data = await prisma.$transaction([
            prisma.item.count({
              where: {
                published: true,

                price: {
                  lte: Number(priceRange),
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
              },
            }),
            prisma.item.findMany({
              take: 6,
              include: {
                likes: true,
              },
              where: {
                published: true,

                price: {
                  lte: Number(priceRange),
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
              },
              orderBy: {
                price: "asc",
              },
              skip: page * 6 || 0,
            }),
          ]);

          return res.status(200).json(data);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      } else {
        try {
          const data = await prisma.$transaction([
            prisma.item.count({
              where: {
                published: true,

                price: {
                  lte: Number(priceRange) || 0,
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
                category: category,
              },
            }),
            prisma.item.findMany({
              take: 6,
              include: {
                likes: true,
              },
              where: {
                published: true,

                price: {
                  lte: Number(priceRange) || 0,
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
                category: category,
              },
              orderBy: {
                price: "asc",
              },
              skip: page * 6 || 0,
            }),
          ]);
          return res.status(200).json(data);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      }
    }
    if (sort === "First added") {
      if (category === "ALL") {
        try {
          const data = await prisma.$transaction([
            prisma.item.count({
              where: {
                published: true,

                price: {
                  lte: Number(priceRange),
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
              },
            }),
            prisma.item.findMany({
              take: 6,
              include: {
                likes: true,
              },
              where: {
                published: true,

                price: {
                  lte: Number(priceRange),
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
              },
              orderBy: {
                createdAt: "asc",
              },
              skip: page * 6 || 0,
            }),
          ]);

          return res.status(200).json(data);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      } else {
        try {
          const data = await prisma.$transaction([
            prisma.item.count({
              where: {
                published: true,

                price: {
                  lte: Number(priceRange) || 0,
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
                category: category,
              },
            }),
            prisma.item.findMany({
              take: 6,
              include: {
                likes: true,
              },
              where: {
                published: true,

                price: {
                  lte: Number(priceRange) || 0,
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
                category: category,
              },
              orderBy: {
                createdAt: "asc",
              },
              skip: page * 6 || 0,
            }),
          ]);
          return res.status(200).json(data);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      }
    }
    if (sort === "Recently added") {
      if (category === "ALL") {
        try {
          const data = await prisma.$transaction([
            prisma.item.count({
              where: {
                published: true,

                price: {
                  lte: Number(priceRange),
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
              },
            }),
            prisma.item.findMany({
              orderBy: {
                createdAt: "desc",
              },
              skip: page * 6 || 0,
              take: 6,
              include: {
                likes: true,
              },
              where: {
                published: true,

                price: {
                  lte: Number(priceRange),
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
              },
            }),
          ]);

          return res.status(200).json(data);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      } else {
        try {
          const data = await prisma.$transaction([
            prisma.item.count({
              where: {
                published: true,

                price: {
                  lte: Number(priceRange) || 0,
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
                category: category,
              },
            }),
            prisma.item.findMany({
              take: 6,
              include: {
                likes: true,
              },
              where: {
                published: true,

                price: {
                  lte: Number(priceRange) || 0,
                },
                owner: {
                  verified: verifiedCreator.toLowerCase() === "true",
                },
                category: category,
              },
              orderBy: {
                createdAt: "desc",
              },
              skip: page * 6 || 0,
            }),
          ]);
          return res.status(200).json(data);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      }
    }
  }
};

export default handler;
