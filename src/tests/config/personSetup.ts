import { PrismaClient } from "@prisma/client";

export const globalBeforeAllPerson = () => {
  beforeAll(async () => {
    const prisma = new PrismaClient();
    await prisma.person.deleteMany({});
  });
};
