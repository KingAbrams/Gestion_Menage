import { Router, Request, Response } from "express";
import PersonController from "../../controllers/PersonController";
const router = Router();
const personController = new PersonController();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Household Management");
});
router.get("/api/persons", personController.getAllPersons);
router.get("/api/persons/:id", personController.getPersonById);
router.post("/api/persons", personController.createPerson);

export default router;
