import { PrismaClient } from "@prisma/client";
import PersonService from "../services/PersonService";
import { personSample } from "./fixtures/personSample";
import { mockPrismaClient } from "./mocks/prismaClient";

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe("[PERSON SERVICE]", () => {
  let personService: PersonService;
  let prismaMock: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    personService = new PersonService();
    prismaMock = new PrismaClient() as jest.Mocked<PrismaClient>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("[getAllPersons] should return all persons", async () => {
    const mockPersons = personSample;

    (prismaMock.person.findMany as jest.Mock).mockResolvedValue(mockPersons);

    const result = await personService.getAllPersons();

    expect(result).toEqual(mockPersons);
    expect(prismaMock.person.findMany).toHaveBeenCalled();
  });

  test("[getPersonById] should return person specified", async () => {
    const mockPerson = personSample[0];
    const { id } = mockPerson;

    (prismaMock.person.findUnique as jest.Mock).mockResolvedValue(mockPerson);

    const result = await personService.getPersonById(id);

    expect(result).toEqual(mockPerson);
    expect(prismaMock.person.findUnique).toHaveBeenCalled();
    expect(prismaMock.person.findUnique).toHaveBeenCalledWith({
      where: { id },
    });
  });

  test("[createPerson] should return person specified", async () => {
    const mockPerson = personSample[0];

    (prismaMock.person.create as jest.Mock).mockResolvedValue(mockPerson);

    const result = await personService.createPerson(mockPerson);

    expect(result).toEqual(mockPerson);
    expect(prismaMock.person.create).toHaveBeenCalled();
    expect(prismaMock.person.create).toHaveBeenCalledWith({
      data: mockPerson,
    });
  });

  test("[createPerson] should return null when person already exists", async () => {
    const mockPerson = personSample[0];

    (prismaMock.person.create as jest.Mock).mockResolvedValue(null);

    const result = await personService.createPerson(mockPerson);

    expect(result).toBeNull();
  });

  test("[createPerson] should throw an error when creation fails", async () => {
    const mockPerson = personSample[0];
    const errorMock = new Error("Failed to create");

    (prismaMock.person.create as jest.Mock).mockRejectedValue(errorMock);

    await expect(personService.createPerson(mockPerson)).rejects.toThrow();
  });

  test("[updatePerson] should update an existing person", async () => {
    const mockPerson = personSample[0];
    const { id } = mockPerson;

    (prismaMock.person.update as jest.Mock).mockResolvedValue(mockPerson);

    const result = await personService.updatePerson(id, mockPerson);

    expect(prismaMock.person.update).toHaveBeenCalled();
    expect(prismaMock.person.update).toHaveBeenCalledWith({
      where: { id: id },
      data: mockPerson,
    });
    expect(result).toEqual(mockPerson);
  });

  test("[updatePerson] should throw an error when update fails", async () => {
    const mockPerson = personSample[0];
    const { id } = mockPerson;
    const errorMock = new Error("Failed to update");

    (prismaMock.person.update as jest.Mock).mockRejectedValue(errorMock);

    await expect(personService.updatePerson(id, mockPerson)).rejects.toThrow();
  });

  test("[deletePerson] should delete an existing person", async () => {
    const mockPerson = personSample[0];
    const { id } = mockPerson;

    (prismaMock.person.delete as jest.Mock).mockResolvedValue(mockPerson);

    const result = await personService.deletePerson(id);

    expect(prismaMock.person.delete).toHaveBeenCalled();
    expect(prismaMock.person.delete).toHaveBeenCalledWith({ where: { id } });
    expect(result).toEqual(mockPerson);
  });

  test("[deletePerson] should return null when person does not exist", async () => {
    const mockPerson = personSample[0];
    const { id } = mockPerson;

    (prismaMock.person.delete as jest.Mock).mockResolvedValue(null);

    const result = await personService.deletePerson(id);

    expect(prismaMock.person.delete).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  test("[deletePerson] should throw an error when deletion fails", async () => {
    const mockPerson = personSample[0];
    const { id } = mockPerson;
    const errorMock = new Error("Failed to delete");

    (prismaMock.person.delete as jest.Mock).mockRejectedValue(errorMock);

    await expect(personService.deletePerson(id)).rejects.toThrow();
  });
});
