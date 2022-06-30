const { PrismaClient } = require("@prisma/client");

const data = require("./seed.data.json");
const client = new PrismaClient();

async function seed() {
  try {
    await client.user.deleteMany();
    console.log("Deleted records user table");
    await client.item.deleteMany();
    console.log("Deleted records in item table");

    await client.user.createMany({
        data: data.users,
      });
     console.log("Added user data");

    await client.item.createMany({
      data: data.items,
    });
    console.log("Added product data");
  } catch (error) {
    console.log("error seeding database ", error);
  }
}

seed();
