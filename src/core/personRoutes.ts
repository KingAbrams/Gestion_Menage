import { Router, Request, Response } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Household Management");
});
router.get("/api/person", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

export default router;
