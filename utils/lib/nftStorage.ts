import { NFTStorage } from "nft.storage";

const storage = new NFTStorage({
  token: process.env.NFT_STORAGE_KEY || "",
});

export default storage;
