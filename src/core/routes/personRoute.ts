import { Router, Request, Response, NextFunction } from "express";
import PersonController from "../../controllers/PersonController";
import PersonService from "../../services/PersonService";
const router = Router();
const personService = new PersonService();
const personController = new PersonController(personService);

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Household Management");
});
router.get("/api/persons", personController.getAllPersons);
router.get("/api/persons/:id", personController.getPersonById);
router.post("/api/persons", personController.createPerson);
router.put("/api/persons/:id", personController.updatePerson);
router.delete("/api/persons/:id", personController.deletePerson);

router.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send("Resource not found, try another URL");
});

export default router;
