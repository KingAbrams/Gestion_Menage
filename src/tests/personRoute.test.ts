import { PrismaClient } from "@prisma/client";
import PersonService from "../services/PersonService";
import { personSample } from "./fixtures/personSample";

jest.mock("@prisma/client", () => ({
  PrismaClient: {
    $queryRaw: jest.fn(),
    person: {
      findMany: jest.fn(),
    },
  },
}));

describe.skip("[PERSON]", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return data successfully when fetch is successful", async () => {
    const personService = new PersonService();
    const prismaMock = new PrismaClient();
    // const { prisma } = require("./mocks/prismaClient.ts");
    const resultExpected = personSample;

    (prismaMock.$queryRaw as jest.Mock).mockResolvedValue(resultExpected);

    const result = await personService.getAllPersons();
    console.log("RESULT", result);

    expect(prismaMock.person.findMany).toHaveBeenCalledTimes(1);
  });
});
