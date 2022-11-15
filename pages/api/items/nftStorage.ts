import { NextApiRequest, NextApiResponse } from "next";
import { File, NFTStorage } from "nft.storage";
import formidable from "formidable";
import fs from "fs";
export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const form = formidable();
      form.parse(req, async (err, fields, files) => {
        const name = fields.name as string;
        const description = fields.description as string;
        //@ts-ignore
        const filepath = files?.image?.filepath;
        console.log("filepath", filepath);
        if (filepath) {
          const nftStorage = new NFTStorage({
            token: process.env.NFT_STORAGE_KEY || "",
          });

          const resp = await nftStorage.store({
            image: new File([await fs.promises.readFile(filepath)], name, {
              //@ts-ignore
              type: files.image.mimetype,
            }),
            name,
            description,
          });
          console.log("created nft data ==> ", resp);
          return res.status(200).json(resp);
        }
        if (fields.image) {
          fetch(fields?.image as string)
            .then((res) => res.blob())
            .then(async (myBlob) => {
              const myFile = new File([myBlob], "image.jpeg", {
                type: myBlob.type,
              });
              const nftStorage = new NFTStorage({
                token: process.env.NFT_STORAGE_KEY || "",
              });
              const resp = await nftStorage.store({
                image: myFile,
                name,
                description,
              });
              console.log("created nft data ==> ", resp);
              return res.status(200).json(resp);
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
