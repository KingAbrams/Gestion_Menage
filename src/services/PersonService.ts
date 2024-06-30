import { Person, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class PersonService {
  async getAllPersons(): Promise<Person[]> {
    try {
      const data = await prisma.person.findMany({});
      return data;
    } catch (error) {
      throw new Error(`Error fetching persons: ${error}`);
    }
  }
}

export default PersonService;
