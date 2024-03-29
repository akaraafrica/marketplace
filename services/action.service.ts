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
  wonBid = "d-c1c0221f09144b19b350b30a759aa2d6",
  Purchase = "d-dd6a356d09a5451bbefed7a80d39e8fb",
  CreateItem = "d-c682315847e647ec9aed19d0178d7836",
  CreateCollection = "d-d0ee395b7aa1424fa0a7d55d11e15d95",
  ContributorNotice = "d-105c1e4ff3604744b70492b9959c2602",
  ContributorAction = "d-c9b35776b4184886800d02fcf6f0ad11",
  CollectionApproved = "d-a9bc4e56560741838968f05bc8d88a12",
  BeneficiaryNotice = "d-4ae903e4badf4970ab77324344bda42e",
  NewBeneficiaryNotice = "d-6be5ee7228c24b479831387549302a39",
}

export const enum Actions {
  PlaceBid = "place-bid",
  wonBid = "won-bid",
  Follow = "follow",
  Purchase = "purchase",
  BeneficiaryNotice = "beneficiary-notice",
  NewBeneficiaryNotice = "newbeneficiary-notice",
  CreateItem = "create-item",
  CreateCollection = "create-collection",
  CollectionApproved = "collection-approved",
  ContributorNotice = "contributor-notice",
  ContributorAction = "contributor-action",
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
  emailAddress?: string;
  contributorStatus?: string;
}

export async function TriggerAction(props: ActionProps) {
  const {
    action,
    user,
    item,
    collection,
    bidAmount,
    profile,
    title,
    content,
    emailAddress,
    contributorStatus,
  } = props;

  let data = [];
  let emailData = [];

  switch (action) {
    case Actions.PlaceBid:
      if (!item || !bidAmount) throw Error("invalid action");
      data.push({
        receiverId: item.owner.id,
        senderId: user.id,
        action: action,
        title: "Your item received A bid",
        description: `${getUserName(user)} place ${bidAmount} ETH bid on ${
          item?.title
        }`,
        itemType: ItemType.Bid,
        itemId: item.id,
      });
      emailData.push({
        to: item.owner.email,
        from: "info@mbizi.org",
        templateId: MailTemplateIDs.PlaceBid,
        title: item.title,
        amount: bidAmount,
        link: `${process.env.NEXT_PUBLIC_DOMAIN}item/${item.id}/`,
      });
      if (data && emailData) {
        await inApp(data);
        await email(emailData);
      }
      break;
    case Actions.wonBid:
      if (!item || !bidAmount) throw Error("invalid action");

      data.push({
        receiverId: user.id,
        senderId: item.ownerId,
        action: action,
        title: "Bid Won",
        description: `congratulation ${getUserName(user)} you won bid on ${
          item?.title
        } for ${bidAmount} ETH`,
        itemType: ItemType.Bid,
        itemId: item.id,
      });

      emailData.push({
        to: user.email,
        from: "info@mbizi.org",
        templateId: MailTemplateIDs.wonBid,
        title: item.title,
        amount: bidAmount,
        link: `${process.env.NEXT_PUBLIC_DOMAIN}item/${item.id}/`,
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
        title: "A new follower",
        description: `${getUserName(user)} follows you`,
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
        title: "Your Item is getting noticed",
        description: `${getUserName(user)} likes ${item?.title} `,
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
        title: "Your item has been purchased",
        description: `${getUserName(user)} purchase ${item?.title} for ${
          item.price
        } ETH`,
        itemType: ItemType.Bid,
        itemId: item.id,
      });
      emailData.push({
        to: item.owner.email,
        from: "info@mbizi.org",
        templateId: MailTemplateIDs.Purchase,
        title: item.title,
        amount: item.price,
        link: `${process.env.NEXT_PUBLIC_DOMAIN}item/${item.id}/`,
      });
      if (data && emailData) {
        await inApp(data);
        await email(emailData);
      }
      break;
    case Actions.BeneficiaryNotice:
      if (!collection || !emailAddress) throw Error("invalid action");

      emailData.push({
        to: emailAddress,
        from: "info@mbizi.org",
        templateId: MailTemplateIDs.BeneficiaryNotice,
        title: collection.title,
        author: getUserName(user),
        link: `${process.env.NEXT_PUBLIC_DOMAIN}collection/${collection.id}/admin/`,
      });
      if (emailData) {
        await email(emailData);
      }
      break;
    case Actions.NewBeneficiaryNotice:
      if (!collection || !emailAddress) throw Error("invalid action");

      emailData.push({
        to: emailAddress,
        from: "info@mbizi.org",
        templateId: MailTemplateIDs.NewBeneficiaryNotice,
        title: collection.title,
        author: getUserName(user),
        link: `${process.env.NEXT_PUBLIC_DOMAIN}signup/`,
      });
      if (emailData) {
        await email(emailData);
      }
      break;
    case Actions.ContributorAction:
      if (!collection || !contributorStatus) throw Error("invalid action");
      console.log({ collection, user, contributorStatus });

      data.push({
        receiverId: collection.author.id,
        senderId: user.id,
        action: action,
        title: "Contributor Request",
        description: `${getUserName(
          user
        )} has ${contributorStatus} your request to join ${collection.title}`,
        itemType: ItemType.Collection,
        collectionId: collection.id,
      });
      emailData.push({
        to: collection.author.email,
        from: "info@mbizi.org",
        templateId: MailTemplateIDs.ContributorAction,
        title: collection.title,
        contributor: getUserName(user),
        action: contributorStatus,
        contributorStatus: contributorStatus,
        link: `${process.env.NEXT_PUBLIC_DOMAIN}collection/${collection.id}/admin/`,
      });
      if (data && emailData) {
        await inApp(data);
        await email(emailData);
      }
      break;
    case Actions.CollectionApproved:
      if (!collection) throw Error("invalid action");
      data.push({
        receiverId: collection.author.id,
        senderId: collection.author.id,
        action: action,
        title: "Collection Approved",
        description: `Congratulation your collection ${collection.title} is approved`,
        itemType: ItemType.Collection,
        collectionId: collection.id,
      });
      emailData.push({
        to: collection.author.email,
        from: "info@mbizi.org",
        templateId: MailTemplateIDs.CollectionApproved,
        title: collection.title,
        link: `${process.env.NEXT_PUBLIC_DOMAIN}collection/${collection.id}/admin/`,
      });
      if (data && emailData) {
        await inApp(data);
        await email(emailData);
      }
      break;

    case Actions.ContributorNotice:
      if (!collection) throw Error("invalid action");
      const promise: any = [];

      collection.contributors.forEach((contributor) => {
        const data = {
          receiverId: contributor.user.id,
          senderId: user.id,
          action: action,
          title: "Contributor Notice",
          description: `${getUserName(
            user
          )} request your approval to add your item(s) to his ${
            collection?.title
          } collection. Check the collection dashboard and approve or decline.`,
          itemType: ItemType.Collection,
          collectionId: collection.id,
        };
        const emailData = {
          to: contributor.user.email,
          from: "info@mbizi.org",
          templateId: MailTemplateIDs.ContributorNotice,
          title: collection.title,
          author: getUserName(user),
          link: `${process.env.NEXT_PUBLIC_DOMAIN}collection/${collection.id}/admin/`,
        };
        if (data && emailData) {
          if (contributor.userId === user.id) {
            return;
          }
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
