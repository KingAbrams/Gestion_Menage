import { IPerson } from "../models/person";
import db from "../config/knexfile";

class PersonService {
  async getAllPersons(): Promise<IPerson[]> {
    try {
      const data = await db.select("*").from("person");
      return data;
    } catch (error) {
      throw new Error(`Error fetching persons: ${error}`);
    }
  }
}

export default PersonService;
