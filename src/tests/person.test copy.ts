// import request from "supertest";
import { PrismaClient } from "@prisma/client";
import server from "../../server";
import PersonService from "../services/PersonService";
// import { mockPrismaClient } from "./mocks/prismaClient";

export const mockPrismaClient = {
  $queryRaw: jest.fn(),
  person: {
    findMany: jest.fn(),
  },
  $disconnect: jest.fn(),
};

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => mockPrismaClient),
}));

describe("[PERSON]", () => {
  let prisma: PrismaClient;

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    prisma = new PrismaClient();
  });

  afterEach(() => {
    mockPrismaClient.$disconnect;
    jest.clearAllMocks;
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
    (prisma.person.findMany as jest.Mock).mockResolvedValue(mockResult);

    const result = await personService.getAllPersons();
    console.log("RESULT", result);

    expect(result).toEqual(mockResult);
  });
});
