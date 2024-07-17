import PersonController from "../controllers/PersonController";
import PersonService from "../services/PersonService";
import { Request, Response } from "express";
import { personSample } from "./fixtures/personSample";
import { logger } from "../config/logger";

jest.mock("../services/PersonService.ts");
jest.mock("../config/logger.ts", () => {
  return {
    logger: {
      info: jest.fn(),
      error: jest.fn(),
    },
  };
});

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

  test("[getAllPersons] Should return an error with status 500 when fetch fails", async () => {
    const errorMock = new Error("Failed to fetch");

    personServiceMock.getAllPersons.mockRejectedValue(errorMock);

    await personController.getAllPersons(req, res);

    expect(logger.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("[getPersonById] Should return person with status 200 when fetch successful", async () => {
    const personMock = personSample[0];
    const params = { id: "1" };

    req.params = params;

    personServiceMock.getPersonById.mockResolvedValue(personMock);

    await personController.getPersonById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Fetch successful",
      data: personMock,
    });
  });

  test("[getPersonById] Should return an error with status 500 when fetch fails", async () => {
    const errorMock = new Error("Failed fetch");

    personServiceMock.getPersonById.mockRejectedValue(errorMock);

    await personController.getPersonById(req, res);

    expect(logger.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("[getPersonById] Should return an error with status 400 when ID is invalid", async () => {
    const msgExpected = "Invalid ID format";
    const params = { id: "Invalid" };

    req.params = params;

    await personController.getPersonById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: msgExpected,
    });
  });

  test("[createPerson] Should return person created with status 201 when create successful", async () => {
    const msgCreate = "Creation successful";
    const newPerson = personSample[0];

    personServiceMock.createPerson.mockResolvedValue(newPerson);

    req.body = newPerson;

    await personController.createPerson(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: msgCreate,
      data: newPerson,
    });
  });

  test("[updatePerson] Should return person updated with status 200 when create successful", async () => {
    const msgUpdate = "Update successful";
    const personToUpdate = { ...personSample[0], job: "Developer Backend" };
    const { id } = personSample[0];

    personServiceMock.updatePerson.mockResolvedValue(personToUpdate);

    req.params = { id: id.toString() };
    req.body = personToUpdate;

    await personController.updatePerson(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: msgUpdate,
      data: personToUpdate,
    });
  });

  test("[updatePerson] Should return an error with status 500 when update fails", async () => {
    const errorMock = new Error("Failed to update");
    const { id } = personSample[0];

    personServiceMock.updatePerson.mockRejectedValue(errorMock);

    req.params = { id: id.toString() };

    await personController.updatePerson(req, res);

    expect(logger.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("[updatePerson] Should return an error with status 400 when ID is invalid", async () => {
    const msgExpected = "Invalid ID format";
    const params = { id: "Invalid" };

    req.params = params;

    await personController.updatePerson(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: msgExpected,
    });
  });

  test("[deletePerson] Should return person deleted and status 200 when deletion successful", async () => {
    const msgDelete = "Deletion successful";
    const personDeleted = personSample[0];
    const { id } = personSample[0];

    personServiceMock.deletePerson.mockResolvedValue(personDeleted);

    req.params = { id: id.toString() };

    await personController.deletePerson(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: msgDelete,
      data: personDeleted,
    });
  });

  test("[deletePerson] Should return an error with status 500 when deletion fails", async () => {
    const errorMock = new Error("Failed to delete");
    const { id } = personSample[0];

    personServiceMock.deletePerson.mockRejectedValue(errorMock);

    req.params = { id: id.toString() };

    await personController.deletePerson(req, res);

    expect(logger.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("[deletePerson] Should return an error with status 400 when ID is invalid", async () => {
    const msgExpected = "Invalid ID format";
    const params = { id: "Invalid" };

    req.params = params;

    await personController.deletePerson(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: msgExpected,
    });
  });

  test("[deletePerson] Should return an error with status 404 when person does not exist", async () => {
    const msgExpected = "Person does not exist";
    const { id } = personSample[0];

    personServiceMock.deletePerson.mockResolvedValue(null);

    req.params = { id: id.toString() };

    await personController.deletePerson(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: msgExpected,
    });
  });
});
