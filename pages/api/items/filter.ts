import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
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

    if (sort === "Most liked") {
      if (category === "ALL") {
        try {
          const items = await prisma.item.findMany({
            take: 50,
            include: {
              likes: true,
            },
            where: {
              price: {
                lte: Number(priceRange),
              },
              published: true,
              owner: {
                verified: verifiedCreator.toLowerCase() === "true",
              },
            },
            orderBy: {
              likes: {
                _count: "desc",
              },
            },
          });

          return res.status(200).json(items);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      } else {
        try {
          const items = await prisma.item.findMany({
            take: 50,
            include: {
              likes: true,
            },

            where: {
              price: {
                lte: Number(priceRange) || 0,
              },
              published: true,
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
          });
          return res.status(200).json(items);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      }
    }
    if (sort === "Least liked") {
      if (category === "ALL") {
        try {
          const items = await prisma.item.findMany({
            take: 50,
            include: {
              likes: true,
            },
            where: {
              price: {
                lte: Number(priceRange),
              },
              published: true,
              owner: {
                verified: verifiedCreator.toLowerCase() === "true",
              },
            },
            orderBy: {
              likes: {
                _count: "asc",
              },
            },
          });

          return res.status(200).json(items);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      } else {
        try {
          const items = await prisma.item.findMany({
            take: 50,
            include: {
              likes: true,
            },
            where: {
              price: {
                lte: Number(priceRange) || 0,
              },
              published: true,
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
          });
          return res.status(200).json(items);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      }
    }
    if (sort === "Highest price") {
      if (category === "ALL") {
        try {
          const items = await prisma.item.findMany({
            take: 50,
            include: {
              likes: true,
            },
            where: {
              price: {
                lte: Number(priceRange),
              },
              published: true,
              owner: {
                verified: verifiedCreator.toLowerCase() === "true",
              },
            },
            orderBy: {
              price: "desc",
            },
          });

          return res.status(200).json(items);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      } else {
        try {
          const items = await prisma.item.findMany({
            take: 50,
            include: {
              likes: true,
            },
            where: {
              price: {
                lte: Number(priceRange) || 0,
              },
              published: true,
              owner: {
                verified: verifiedCreator.toLowerCase() === "true",
              },
              category: category,
            },
            orderBy: {
              price: "desc",
            },
          });
          return res.status(200).json(items);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      }
    }
    if (sort === "Lowest price") {
      if (category === "ALL") {
        try {
          const items = await prisma.item.findMany({
            take: 50,
            include: {
              likes: true,
            },
            where: {
              price: {
                lte: Number(priceRange),
              },
              published: true,
              owner: {
                verified: verifiedCreator.toLowerCase() === "true",
              },
            },
            orderBy: {
              price: "asc",
            },
          });

          return res.status(200).json(items);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      } else {
        try {
          const items = await prisma.item.findMany({
            take: 50,
            include: {
              likes: true,
            },
            where: {
              price: {
                lte: Number(priceRange) || 0,
              },
              published: true,

              owner: {
                verified: verifiedCreator.toLowerCase() === "true",
              },
              category: category,
            },
            orderBy: {
              price: "asc",
            },
          });
          return res.status(200).json(items);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      }
    }
    if (sort === "First added") {
      if (category === "ALL") {
        try {
          const items = await prisma.item.findMany({
            take: 50,
            include: {
              likes: true,
            },
            where: {
              price: {
                lte: Number(priceRange),
              },
              published: true,

              owner: {
                verified: verifiedCreator.toLowerCase() === "true",
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          });

          return res.status(200).json(items);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      } else {
        try {
          const items = await prisma.item.findMany({
            take: 50,
            include: {
              likes: true,
            },
            where: {
              price: {
                lte: Number(priceRange) || 0,
              },
              owner: {
                verified: verifiedCreator.toLowerCase() === "true",
              },
              published: true,

              category: category,
            },
            orderBy: {
              createdAt: "asc",
            },
          });
          return res.status(200).json(items);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      }
    }
    if (sort === "Recently added") {
      if (category === "ALL") {
        try {
          const items = await prisma.item.findMany({
            take: 50,
            include: {
              likes: true,
            },
            where: {
              price: {
                lte: Number(priceRange),
              },
              published: true,

              owner: {
                verified: verifiedCreator.toLowerCase() === "true",
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          });

          return res.status(200).json(items);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      } else {
        try {
          const items = await prisma.item.findMany({
            take: 50,
            include: {
              likes: true,
            },
            where: {
              price: {
                lte: Number(priceRange) || 0,
              },
              published: true,
              owner: {
                verified: verifiedCreator.toLowerCase() === "true",
              },
              category: category,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
          return res.status(200).json(items);
        } catch (error) {
          res.status(400).json("error");
          console.log(error);
        }
      }
    }
  }
};

export default handler;
