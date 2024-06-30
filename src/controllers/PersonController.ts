import { Request, Response } from "express";
import PersonService from "../services/PersonService";

class PersonController {
  private personService: PersonService;

  constructor() {
    this.personService = new PersonService();
  }

  getAllPersons = async (req: Request, res: Response): Promise<void> => {
    try {
      const persons = await this.personService.getAllPersons();
      res.status(200).json(persons);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default PersonController;
