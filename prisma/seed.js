const { PrismaClient } = require("@prisma/client");

const data = require("./seed.data.json");
const client = new PrismaClient();

async function seed() {
  try {
    await client.userCollection.deleteMany();
    await client.profile.deleteMany();
    await client.collectionRating.deleteMany();
    await client.userRating.deleteMany();
    await client.itemRating.deleteMany();
    await client.rating.deleteMany();
    await client.item.deleteMany();
    await client.collection.deleteMany();
    await client.collectionType.deleteMany();
    await client.user.deleteMany();

    console.log("Deleted records in collection rating table");
    console.log("Deleted records in user collection table");
    console.log("Deleted records in item table");
    console.log("Deleted records in profile table");
    console.log("Deleted records in user table");
    console.log("Deleted records in collection type table");
    console.log("Deleted records in rating table");

    const users = await Promise.all(
      data.users.map(async (user) => {
        return await client.user.create({ data: user });
      })
    );
    console.log("users here is ", users);

    const profiles = await Promise.all(
      data.profiles.map(async (profile, i) => {
        return await client.profile.create({
          data: {
            ...profile,
            userId: users[i].id,
          },
        });
      })
    );
    console.log("profiles here is ", profiles);

    const collectionTypes = await Promise.all(
      data.collectionTypes.map(async (type) => {
        return await client.collectionType.create({ data: type });
      })
    );
    // const collectionTypes = await client.collectionType.createMany({data: data.collectionTypes});
    console.log("collection types here is ", collectionTypes);

    let u = 0;
    let o = 0;
    const collections = await Promise.all(
      data.collections.map(async (collection) => {
        console.log("u here is ", u);
        console.log("o here is ", o);
        u = u == 1 ? 0 : u + 1;
        o = o == 1 ? 0 : o + 1;
        return await client.collection.create({
          data: {
            ...collection,
            collectionTypeId: collectionTypes[u].id,
            authorId: users[o].id,
          },
        });
      })
    );

    let uc = 0;
    const userCollections = await Promise.all(
      collections.map(async (collection) => {
        uc = uc == users.length - 1 ? 0 : uc + 1;
        return await client.userCollection.create({
          data: {
            collectionId: collection.id,
            userId: users[uc].id,
          },
        });
      })
    );
    console.log("user collections here is ", userCollections);

    let j = 0;
    let v = 0;
    const items = await Promise.all(
      data.items.map(async (item) => {
        console.log("Added product data");
        console.log("v here is ", v);
        j = j == 3 ? 0 : j + 1;
        v = v == collections.length - 1 ? 0 : v + 1;
        return await client.item.create({
          data: {
            ...item,
            ownerId: users[j].id,
            collectionId: collections[v].id,
          },
        });
      })
    );

    let i = 0;
    let s = 0;
    const ratings = await Promise.all(
      data.ratings.map(async (rating) => {
        i = i == users.length - 1 ? 0 : i + 1;
        s = s == items.length - 1 ? 0 : s + 1;
        return await client.rating.create({
          data: {
            ...rating,
            itemId: items[s].id,
            raterId: users[i].id,
          },
        });
      })
    );
    console.log("ratings here is ", ratings);

    let r = 0;
    const itemRatings = await Promise.all(
      ratings.map(async (rating) => {
        r = r == items.length - 1 ? 0 : r + 1;
        return await client.itemRating.create({
          data: {
            itemId: items[r].id,
            ratingId: rating.id,
          },
        });
      })
    );
    console.log("item ratings here is ", itemRatings);
    let c = 0;
    const collectionRatings = await Promise.all(
      ratings.map(async (rating) => {
        c = c == collections.length - 1 ? 0 : c + 1;
        return await client.collectionRating.create({
          data: {
            collectionId: collections[c].id,
            ratingId: rating.id,
          },
        });
      })
    );
    console.log("collection ratings here is ", collectionRatings);
  } catch (error) {
    console.log("error seeding database ", error);
  }
}

seed();
