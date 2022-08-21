import prisma from "../utils/lib/prisma";
import mail, { MailDataRequired } from "@sendgrid/mail";
import { IItem } from "../types/item.interface";
import { IUser } from "../types/user.interface";
import { ICollection } from "../types/collection.interface";

const key = process.env.SENDGRID_API_KEY;
mail.setApiKey(key || "");

export const enum ItemType {
  Collection = "collection",
  Item = "item",
  User = "user",
  Bid = "bid",
}

export const enum MailTemplateIDs {
  SignUp = "d-1fbec631dc1248fc9b79e51299b0917f",
  ForgotPassword = "d-903bdb62e29f4f3a9b0f504ed8c0aefa",
  PlaceBid = "",
  AcceptBid = "",
  Follow = "",
  Purchase = "",
}

export const TemplateProps = {
  PlaceBid: {},
  AcceptBid: {},
  Follow: {},
  CollectionInvite: {},
};

export const enum Actions {
  PlaceBid = "place-bid",
  AcceptBid = "accept-bid",
  Follow = "follow",
  Purchase = "purchase",
  CreateItem = "create-item",
  CreateCollection = "create-collection",
  Announcement = "announcement",
  UrgentAnnouncement = "urgent-announcement",
  Like = "like",
}
export interface ActionProps {
  action:
    | "place-bid"
    | "accept-bid"
    | "like"
    | "follow"
    | "purchase"
    | "create-item"
    | "create-collection"
    | "announcement"
    | "urgent-announcement";
  receivers: number[];
  actor: number;
  content?: string;
  title: string;
  itemTypes?: ItemType[];
  itemIds?: number[];
}

async function getItem(type: ItemType, id: number) {
  let item;
  if (type === ItemType.Item) {
    item = await prisma.item.findFirstOrThrow({ where: { id } });
  }
  if (type === ItemType.Collection)
    return await prisma.collection.findFirstOrThrow({ where: { id } });
  if (type === ItemType.Bid)
    return await prisma.bid.findFirstOrThrow({ where: { id } });
}

async function inApp(
  props: ActionProps,
  receiverId: number
  // actor: IUser,
  // receiver: IUser[],
  // items: any[]
) {
  let data = [];

  data.push({
    receiverId: receiverId,
    senderId: props.actor,
    action: props.action,
    read: false,
    content: props.content,
    title: props.title,
    itemType: props?.itemTypes ? props.itemTypes[0] : "",
    itemId: props?.itemIds ? props.itemIds[0] : null,
  });
  console.log({ data });
  console.log(data.length > 0);

  if (data.length > 0) {
    await prisma.notification.createMany({
      data: [...data],
      skipDuplicates: true,
    });
    console.log("notification created");
  }
}

async function email(
  props: ActionProps
  // actor: IUser,
  // receiver: IUser[],
  // items: any[]
) {
  let data: any; // object for single person, Array for multiple
  let isMultiple = false;

  switch (props.action) {
    case Actions.PlaceBid:
      isMultiple = true;

      break;

    case Actions.AcceptBid:
      break;

    case Actions.Follow:
      break;

    case Actions.Purchase:
      break;

    default:
      break;
  }

  await mail.send({ ...data }, isMultiple);
}

export async function TriggerAction(props: ActionProps) {
  props.receivers.forEach(async (receiver) => {
    await inApp(props, receiver);
  });
  // await email(props);
  // await inApp(props, actor, receivers, items);
  // await email(props, actor, receivers, items);
}
