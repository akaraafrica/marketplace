
const { PrismaClient } = require('@prisma/client');

const data = require('./seed.data.json');
const client = new PrismaClient()

async function seed() {

    try {
        await client.item.deleteMany();
        console.log("Deleted records in item table");

        await client.item.createMany({
            data: data.items
        })
        console.log("Added product data");
    } catch (error) {
        console.log("error seeding database ", error)
    }
}

seed()
