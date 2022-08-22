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
export const enum Actions {
  PlaceBid = "place-bid",
  AcceptBid = "accept-bid",
  Follow = "follow",
  Purchase = "purchase",
  CreateItem = "create-item",
  CreateCollection = "create-collection",
  Announcement = "announcement",
  UrgentAnnouncement = "urgent-announcement",
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

export interface ActionProps {
  action: string;
  receivers: number[];
  actor?: number;
  content?: string;
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
  actor: IUser,
  receiver: IUser[],
  items: any[]
) {
  let data = [];
  switch (props.action) {
    case Actions.PlaceBid:
      data.push({
        receiverId: receiver[0].id,
        senderId: actor.id,
        action: props.action,
        read: false,
        content: props.content,
        itemType: props.itemTypes ? props.itemTypes[0] : "",
        itemId: items[0].id,
      });
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

  // await prisma.notification.createMany({
  //   data: [...data],
  //   skipDuplicates: true,
  // });
}

async function email(
  props: ActionProps,
  actor: IUser,
  receiver: IUser[],
  items: any[]
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
  if (
    !props.itemTypes ||
    !props.itemIds ||
    props.itemTypes.length == 0 ||
    props.itemIds?.length == 0
  )
    throw Error("invalid action");

  const items = props.itemTypes?.map(
    async (type, i) => await getItem(type, props.itemIds ? props.itemIds[i] : 0)
  );

  const [actor, ...receivers]: IUser[] = await prisma.user.findMany({
    where: {
      id: { in: [props.actor || 0, ...props.receivers] },
    },
    select: {
      id: true,
      email: true,
      walletAddress: true,
      profile: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  });

  await inApp(props, actor, receivers, items);
  await email(props, actor, receivers, items);
}
