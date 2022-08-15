import { NextApiRequest, NextApiResponse } from "next";
import nftStorage from "../../../utils/lib/nftStorage";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("inside mint api route ......");
  if (req.method != "POST") return res.status(400).send("invalid request");
  // if (!req.body.image) return res.status(500).send("Image is not presented!");
  try {
    const { image, file, name, description } = req.body;
    // console.log("file here is ...", req)
    console.log("or entire file body here is ...", image);

    const resp = await nftStorage.store({
      image,
      name,
      description,
    });
    console.log("minted token here ", resp);
    //  res.status(201).json({ id: response.id, message: "Item created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export default handler;
