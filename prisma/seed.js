const { PrismaClient } = require("@prisma/client");

const data = require("./seed.data.json");
const client = new PrismaClient();

async function seed() {
  try {
    await client.item.deleteMany();
    console.log("Deleted records in item table");

    await client.user.deleteMany();
    console.log("Deleted records user table");

    const users = await Promise.all(
      data.users.map(async (user) => {
        return await client.user.create({ data: user });
      })
    );
    console.log("users here is ", users);

    let j = 0;
    await Promise.all(
      data.items.map(async (item) => {
        console.log("Added product data");
        console.log("j here is ", j);
        j = j == 3 ? 0 : j + 1;
        await client.item.create({ data: { ...item, ownerId: users[j].id } });
      })
    );
  } catch (error) {
    console.log("error seeding database ", error);
  }
}

seed();
