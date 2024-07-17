import PersonController from "../controllers/PersonController";
import PersonService from "../services/PersonService";
import { Request, Response } from "express";
import { personSample } from "./fixtures/personSample";

jest.mock("../services/PersonService.ts");

describe("[PERSON CONTROLLER]", () => {
  let personController: PersonController;
  let personServiceMock: jest.Mocked<PersonService>;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    personServiceMock = new PersonService() as jest.Mocked<PersonService>;
    personController = new PersonController(personServiceMock);
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  test("[getAllPersons] Should return persons with status 200 when fetch successful", async () => {
    const personsMock = personSample;

    personServiceMock.getAllPersons.mockResolvedValue(personsMock);

    await personController.getAllPersons(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Fetch successful",
      data: personsMock,
    });
  });
});
