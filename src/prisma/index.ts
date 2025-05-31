import { PrismaClient } from "../../generated/prisma";

const prismaClient = new PrismaClient();

async function main() {
  console.log("passou pelo prismaClient");
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });

export default prismaClient;
