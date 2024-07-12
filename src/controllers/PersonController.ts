import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import PersonService from "../services/PersonService";

class PersonController {
  private personService: PersonService;

  constructor() {
    this.personService = new PersonService();
  }

  initializePersonDb = async () => {
    const personJsonFilePath = path.join(
      __dirname,
      "..",
      "data",
      "persons.json",
    );

    try {
      const jsonData = fs.readFileSync(personJsonFilePath, "utf-8");
      const persons = JSON.parse(jsonData);

      for (const person of persons) {
        const {
          lastname,
          firstname,
          birthday,
          cin,
          nationality,
          linkWithChief,
          job,
          otherSource,
        } = person;

        if (
          !lastname ||
          !birthday ||
          !nationality ||
          !linkWithChief ||
          !otherSource
        ) {
          throw new Error("Missing required fields for person");
        }

        await this.personService.createPerson({
          lastname,
          firstname,
          birthday,
          cin,
          nationality,
          linkWithChief,
          job,
          otherSource,
        });
      }

      console.log("[Database] Successfully added default Person:");
    } catch (error) {
      console.error("Error initializing default Person:", error);
    }
  };

  getAllPersons = async (req: Request, res: Response): Promise<void> => {
    try {
      const persons = await this.personService.getAllPersons();
      res.status(200).json(persons);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getPersonById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const person = await this.personService.getPersonById(id);

      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).json({ message: "Person not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createPerson = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        firstname,
        lastname,
        birthday,
        cin,
        nationality,
        linkWithChief,
        job,
        otherSource,
      } = req.body;

      if (
        !lastname ||
        !birthday ||
        !nationality ||
        !linkWithChief ||
        !otherSource
      ) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const newPerson = await this.personService.createPerson({
        firstname,
        lastname,
        birthday,
        cin,
        nationality,
        linkWithChief,
        job,
        otherSource,
      });
      res.status(201).json(newPerson);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default PersonController;
