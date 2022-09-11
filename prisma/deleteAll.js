const { PrismaClient } = require("@prisma/client");

const data = require("./seed.data.json");
const client = new PrismaClient();

async function deleteAll() {
  try {
    await client.bid.deleteMany();
    console.log("Deleted records in bid table");
    await client.purchase.deleteMany();
    console.log("Deleted records in purchase table");
    await client.auction.deleteMany();
    console.log("Deleted records in auction table");
    await client.like.deleteMany();
    console.log("Deleted records in like table");
    await client.notification.deleteMany();
    console.log("Deleted records in notification table");
    await client.contributor.deleteMany();
    console.log("Deleted records in contributor table");
    await client.profile.deleteMany();
    console.log("Deleted records in profile table");
    await client.collectionRating.deleteMany();
    console.log("Deleted records in collection ratings table");
    await client.userRating.deleteMany();
    console.log("Deleted records in user ratings table");
    await client.itemRating.deleteMany();
    console.log("Deleted records in item ratings table");
    await client.rating.deleteMany();
    console.log("Deleted records in ratings table");
    await client.item.deleteMany();
    console.log("Deleted records in items table");
    await client.collection.deleteMany();
    console.log("Deleted records in collection table");
    await client.collectionType.deleteMany();
    console.log("Deleted records in collection type table");
    await client.user.deleteMany();
    console.log("Deleted records in user table");
  } catch (error) {
    console.log("error seeding database ", error);
  }
}

deleteAll();
