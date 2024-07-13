import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import PersonService from "../services/PersonService";
import { Person, Prisma } from "@prisma/client";

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
      const persons: Prisma.PersonCreateManyInput[] = JSON.parse(jsonData);
      const result = await this.personService.initializePerson(persons);

      console.log(
        `[Initialization] Successfully added default Person [Count: ${result.length}]`,
      );
    } catch (error) {
      console.error("[Initialization] default Person:", error);
    }
  };

  getAllPersons = async (req: Request, res: Response): Promise<void> => {
    try {
      const persons = await this.personService.getAllPersons();

      res.status(200).json({ message: "Fetch successful", data: persons });
    } catch (error) {
      res.status(500).json({ message: `Error: ${error}` });
    }
  };

  getPersonById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
      }

      const person = await this.personService.getPersonById(id);

      if (person) {
        res.status(200).json({ message: "Fetch successful", data: person });
      } else {
        res.status(404).json({ message: "Person not found" });
      }
    } catch (error) {
      res.status(500).json({ message: `Error: ${error}` });
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
      }: Prisma.PersonCreateInput = req.body;

      if (
        !lastname ||
        !birthday ||
        !nationality ||
        !linkWithChief ||
        !otherSource
      ) {
        res.status(400).json({ message: "Missing required fields" });
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

      if (!newPerson) {
        res
          .status(400)
          .json({ message: "Unique constraint failed on the field" });
        return;
      }

      res.status(201).json({
        message: "Creation successful",
        data: newPerson,
      });
    } catch (error) {
      res.status(500).json({ message: `Error: ${error}` });
    }
  };

  updatePerson = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const data: Prisma.PersonUpdateInput = req.body;

      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
      }

      const result = await this.personService.updatePerson(id, data);

      res.status(200).json({ message: "Update successful", data: result });
    } catch (error) {
      res.status(500).json({ message: `Error: ${error}` });
    }
  };

  deletePerson = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
      }

      const result = await this.personService.deletePerson(id);

      if (!result) {
        res.status(404).json({ message: "Person does not exist" });
        return;
      }

      res.status(200).json({ message: "Deletion successful", data: result });
    } catch (error) {
      res.status(500).json({ message: `Error: ${error}` });
    }
  };
}

export default PersonController;
