import { Person, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class PersonService {
  async getAllPersons(): Promise<Person[]> {
    try {
      const allPersons = await prisma.person.findMany({});

      return allPersons;
    } catch (error) {
      throw new Error(`Error fetching persons: ${error}`);
    }
  }

  async getPersonById(id: number): Promise<Person | null> {
    try {
      const person = await prisma.person.findUnique({
        where: { id },
      });

      return person;
    } catch (error) {
      throw new Error(`Error fetching person by id: ${error}`);
    }
  }

  async createPerson(
    data: Omit<Person, "id" | "createdAt" | "updatedAt">,
  ): Promise<Person> {
    try {
      const newPerson = await prisma.person.create({ data });

      return newPerson;
    } catch (error) {
      throw new Error(`Error creating person: ${error}`);
    }
  }

  async deletePerson(id: number): Promise<Person> {
    try {
      const person = await prisma.person.delete({
        where: { id },
      });

      return person;
    } catch (error) {
      throw new Error(`Error deleting person: ${error}`);
    }
  }
}

export default PersonService;
