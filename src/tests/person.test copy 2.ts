// import request from "supertest";
import { PrismaClient } from "@prisma/client";
import PersonService from "../services/PersonService";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
// import { mockPrismaClient } from "./mocks/prismaClient";

describe("[PERSON]", () => {
  jest.mock("@prisma/client", () => ({
    PrismaClient: jest.fn(),
  }));

  const prismaMock =
    mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

  (PrismaClient as jest.Mock).mockImplementation(() => prismaMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return data successfully when fetch is successful", async () => {
    const personService = new PersonService();
    const mockResult = {
      firstname: "Hannael",
      lastname: " Abrams",
      birthday: " 12-06-2000",
      cin: " 123456789",
      nationality: " Malgache",
      linkWithChief: " Chef",
      job: " Développeur",
      otherSource: "Non",
    };

    // (mockPrismaClient.$queryRaw as jest.Mock).mockResolvedValue(mockResult);
    (prismaMock.person.findMany as jest.Mock).mockResolvedValue(mockResult);

    const result = await personService.getAllPersons();
    console.log("RESULT", result);

    expect(result).toEqual(mockResult);
  });
});
