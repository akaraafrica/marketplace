import { IUser } from "./user.interface";
import { IItem } from "./item.interface";
import { IContributor } from "./contributors.interface";
import { IBeneficiary } from "./beneficiary.interface";
import { ILike } from "./like.interface";

export interface ICollection {
  id: number;
  title: string;
  tokenId: string;
  items: IItem[];
  draftItems: IItem[];
  description: string;
  createdAt: string;
  updatedAt: string;
  revenue: number;
  author: IUser;
  images: string[];
  videos: string[];
  ratings: any[];
  type: CollectionTypes;
  owners: IUser[];
  visible: boolean;
  lunchTime: string;
  status: CollectionStatus;
  contributors: IContributor[];
  beneficiaries: IBeneficiary[];
  likes: ILike[];
}
type CollectionStatus =
  | "DRAFT"
  | "CREATED"
  | "VERIFIED"
  | "READY"
  | "PUBLISHED";

type CollectionTypes =
  | "ORDINARY"
  | "COLLABORATORS"
  | "FUNDRAISING"
  | "LOCKSHARED";
