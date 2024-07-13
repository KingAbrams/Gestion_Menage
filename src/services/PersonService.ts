import { Person, Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
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

  async initializePerson(
    data: Prisma.PersonCreateManyInput[],
  ): Promise<Person[]> {
    try {
      const newPerson = await prisma.person.createManyAndReturn({
        data,
        skipDuplicates: true,
      });

      return newPerson;
    } catch (error) {
      throw new Error(`Error initializing person: ${error}`);
    }
  }

  async createPerson(data: Prisma.PersonCreateInput): Promise<Person | null> {
    try {
      const newPerson = await prisma.person.create({ data });

      return newPerson;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return null;
      }

      throw new Error(`Error creating person: ${error}`);
    }
  }

  async updatePerson(
    id: number,
    data: Prisma.PersonUpdateInput,
  ): Promise<Person> {
    try {
      const updatedPerson = await prisma.person.update({
        where: { id },
        data,
      });

      return updatedPerson;
    } catch (error) {
      throw new Error(`Error updating person: ${error}`);
    }
  }

  async deletePerson(id: number): Promise<Person | null> {
    try {
      const deletedPerson = await prisma.person.delete({
        where: { id },
      });

      return deletedPerson;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return null;
      }
      throw new Error(`Error deleting person: ${error}`);
    }
  }
}

export default PersonService;
