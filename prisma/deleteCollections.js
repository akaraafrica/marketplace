const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

async function deleteCollections() {
  try {
    await client.collection.deleteMany();
    console.log("Collections deleted");
  } catch (error) {
    console.log(error);
  }
}

deleteCollections();
