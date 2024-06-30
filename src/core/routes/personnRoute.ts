import { Router, Request, Response } from "express";
import PersonController from "../../controllers/PersonController";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Household Management");
});
router.get("/api/persons", PersonController.factory().getAllPersons);

export default router;
