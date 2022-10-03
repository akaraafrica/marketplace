import prisma from "../utils/lib/prisma";
import mail, { MailDataRequired } from "@sendgrid/mail";
import { IItem } from "../types/item.interface";
import { IUser } from "../types/user.interface";
import { ICollection } from "../types/collection.interface";
import SendMail from "../utils/sendgrid/sendmail";
import { IProfile } from "../types/profile.interface";
import { getUserName } from "../utils/helpers/getUserName";

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
  PlaceBid = "d-dde581e5172d48f596db1b48cbd28773",
  AcceptBid = "d-c1c0221f09144b19b350b30a759aa2d6",
  Purchase = "d-dd6a356d09a5451bbefed7a80d39e8fb",
  CreateItem = "d-c682315847e647ec9aed19d0178d7836",
  CreateCollection = "d-d0ee395b7aa1424fa0a7d55d11e15d95",
}

export const enum Actions {
  PlaceBid = "place-bid",
  AcceptBid = "accept-bid",
  Follow = "follow",
  Purchase = "purchase",
  CreateItem = "create-item",
  CreateCollection = "create-collection",
  AddItem = "add-item",
  Announcement = "announcement",
  UrgentAnnouncement = "urgent-announcement",
  Like = "like",
}

async function inApp(data: any) {
  try {
    await prisma.notification.createMany({
      data: [...data],
      skipDuplicates: true,
    });

    console.log("In App notification created");
  } catch (error) {
    console.log(error);
  }
}

async function email(data: any) {
  try {
    const res = await SendMail(data[0]);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
export interface ActionProps {
  action: Actions;
  user: IUser;
  item?: IItem;
  profile?: IProfile;
  collection?: ICollection;
  bidAmount?: number;
  title?: string;
  content?: string;
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

export async function TriggerAction(props: ActionProps) {
  const { action, user, item, collection, bidAmount, profile, title, content } =
    props;

  let data = [];
  let emailData = [];

  switch (action) {
    case Actions.PlaceBid:
      if (!item || !bidAmount) throw Error("invalid action");
      data.push({
        receiverId: item.owner.id,
        senderId: user.id,
        action: action,
        title: `${getUserName(user)} place ${bidAmount} ETH bid on ${
          item?.title
        }`,
        itemType: ItemType.Bid,
        itemId: item.id,
      });
      emailData.push({
        to: user.email,
        from: "info@mbizi.org",
        templateId: MailTemplateIDs.PlaceBid,
        title: item.title,
        amount: bidAmount,
        link: `${process.env.NEXT_PUBLIC_DOMAIN} / item / ${item.id}`,
      });
      if (data && emailData) {
        await inApp(data);
        await email(emailData);
      }
      break;
    case Actions.AcceptBid:
      if (!item || !bidAmount) throw Error("invalid action");

      data.push({
        receiverId: item.owner.id,
        senderId: user.id,
        action: action,
        title: `congratulation 
        ${getUserName(user)}
         your bid on ${item?.title} for ${item.price} ETH is accepted`,
        itemType: ItemType.Bid,
        itemId: item.id,
      });

      emailData.push({
        to: item.owner.email,
        from: "info@mbizi.org",
        templateId: MailTemplateIDs.AcceptBid,
        title: item.title,
        amount: bidAmount,
        link: `${process.env.NEXT_PUBLIC_DOMAIN} /item/${item.id} `,
      });
      if (data && emailData) {
        await inApp(data);
        await email(emailData);
      }
      break;
    case Actions.Follow:
      if (!profile) throw Error("invalid action");

      data.push({
        receiverId: profile.id,
        senderId: user.id,
        action: action,
        title: `${getUserName(user)}
  follows you`,
      });

      if (data) {
        await inApp(data);
      }
      break;
    case Actions.Like:
      if (!item) throw Error("invalid action");
      data.push({
        receiverId: item.owner.id,
        senderId: user.id,
        action: action,
        title: `
        ${getUserName(user)}likes ${item?.title} `,
        itemType: ItemType.Item,
        itemId: item.id,
      });

      if (data) {
        await inApp(data);
      }
      break;
    case Actions.Purchase:
      if (!item) throw Error("invalid action");
      data.push({
        receiverId: item.owner.id,
        senderId: user.id,
        action: action,
        title: `${getUserName(user)} purchase ${item?.title} for ${
          item.price
        } ETH`,
        itemType: ItemType.Bid,
        itemId: item.id,
      });
      emailData.push({
        to: user.email,
        from: "info@mbizi.org",
        templateId: MailTemplateIDs.Purchase,
        title: item.title,
        amount: item.price,
        link: `${process.env.NEXT_PUBLIC_DOMAIN} /item/${item.id} `,
      });
      if (data && emailData) {
        await inApp(data);
        await email(emailData);
      }
      break;
    case Actions.AddItem:
      if (!item || !collection) throw Error("invalid action");
      console.log(collection);

      data.push({
        receiverId: item.owner.id,
        senderId: user.id,
        action: action,
        title: ` ${getUserName(user)} is requesting to add ${item?.title} to ${
          collection?.title
        } collection `,
        itemType: ItemType.Collection,
        itemId: item.id,
      });
      // emailData.push({
      //   to: user.email,
      //   from: "info@mbizi.org",
      //   templateId: MailTemplateIDs.Purchase,
      //   title: item.title,
      //   amount: item.price,
      //   link: `${ process.env.NEXT_PUBLIC_DOMAIN } /item/${ item.id } `,
      // });
      if (data) {
        await inApp(data);
        // await email(emailData);
      }
      break;
    case Actions.CreateItem:
      if (!item) throw Error("invalid action");
      data.push({
        receiverId: user.id,
        senderId: user.id,
        action: action,
        title: `congratulation ${getUserName(user)} ${
          item?.title
        } has been minted`,
        itemType: ItemType.Item,
        itemId: item.id,
      });
      emailData.push({
        to: user.email,
        from: "info@mbizi.org",
        templateId: MailTemplateIDs.CreateItem,
        title: item.title,
        amount: item.price,
        link: `${process.env.NEXT_PUBLIC_DOMAIN} /item/${item.id} `,
      });
      if (data && emailData) {
        await inApp(data);
        await email(emailData);
      }
      break;
    case Actions.CreateCollection:
      if (!collection) throw Error("invalid action");
      let promise: any = [];

      collection.contributors.forEach((contributor) => {
        const data = {
          receiverId: contributor.user.id,
          senderId: user.id,
          action: action,
          title: ` ${getUserName(
            user
          )} request your approval to add your item(s) to his ${
            collection?.title
          } collection`,
          itemType: ItemType.Collection,
        };
        const emailData = {
          to: contributor.user.email,
          from: "info@mbizi.org",
          templateId: MailTemplateIDs.CreateCollection,
          title: collection.title,
          link: `${process.env.NEXT_PUBLIC_DOMAIN} /collection/${collection.id} `,
        };
        if (data && emailData) {
          promise.push(inApp([data]));
          promise.push(email([emailData]));
        }
      });

      Promise.all(promise);

      break;
    case Actions.Announcement:
      if (!title || !content) throw Error("invalid action");
      let users = await prisma.user.findMany({
        include: {
          profile: true,
        },
      });
      let promises: any = [];
      users.forEach((user) => {
        promises.push(
          inApp([
            {
              receiverId: user.id,
              senderId: user.id,
              action: action,
              title: title,
              content: content,
            },
          ])
        );
      });

      Promise.all(promises);
      break;
    default:
      break;
  }
}
