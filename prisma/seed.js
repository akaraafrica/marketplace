const { PrismaClient } = require("@prisma/client");

const data = require("./seed.data.json");
const client = new PrismaClient();

async function seed() {
  try {
    await client.item.deleteMany();
    await client.user.deleteMany();
    await client.profile.deleteMany();

    console.log("Deleted records in item table");
    console.log("Deleted records user table");
    console.log("Deleted records profile table");

    const users = await Promise.all(
      data.users.map(async (user) => {
        return await client.user.create({ data: user });
      })
    );
    console.log("users here is ", users);

    const profiles = await Promise.all(
      data.profiles.map(async (profile, i) => {
        return await client.profile.create({
          data: { ...profile, userId: users[i].id },
        });
      })
    );
    console.log("profiles here is ", profiles);

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
