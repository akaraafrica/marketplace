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
}
export const enum Actions {
  PlaceBid = "place-bid",
  AcceptBid = "accept-bid",
  Follow = "follow",
  Purchase = "purchase",
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
  receiver: number;
  actor?: number;
  content?: string;
  itemType?: ItemType;
  itemId?: number;
}

async function getItem(type: ItemType, id: number) {
  let item;
  if (type === ItemType.Item) {
    item = await prisma.item.findFirstOrThrow({ where: { id } });
  }
  if (type === ItemType.Collection)
    return await prisma.collection.findFirstOrThrow({ where: { id } });
}

async function inApp(
  props: ActionProps,
  actor: IUser,
  receiver: IUser,
  item: any
) {
  let data = [];
  switch (props.action) {
    case Actions.PlaceBid:
      data.push({
        receiverId: receiver.id,
        senderId: actor.id,
        action: props.action,
        read: false,
        content: props.content,
        itemType: props.itemType,
        itemId: item?.id,
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

  await prisma.notification.createMany({
    data: [...data],
    skipDuplicates: true,
  });
}

async function email(
  props: ActionProps,
  actor: IUser,
  receiver: IUser,
  item: any
) {
  let data: any;
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
  if (!props.itemType || !props.itemId) throw Error("invalid action");
  const item = await getItem(props.itemType, props.itemId || 0);

  const [receiver, actor]: IUser[] = await prisma.user.findMany({
    where: {
      id: { in: [props.receiver, props.actor || 0] },
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

  await inApp(props, actor, receiver, item);
  await email(props, actor, receiver, item);
}
