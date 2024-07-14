import PersonService from "../services/PersonService";
import { prismaMock } from "./mocks/singleton";

describe("[PERSON]", () => {
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

    (prismaMock.$queryRaw as jest.Mock).mockResolvedValue;

    const result = await personService.getAllPersons();

    expect(result).toEqual(mockResult);
  });
});
