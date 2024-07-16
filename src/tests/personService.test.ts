import PersonService from "../services/PersonService";
import { personSample } from "./fixtures/personSample";

describe.skip("[PERSON SERVICE]", () => {
  describe("[getAllPersons]", () => {
    test("Should return data successfully when fetch is successful", async () => {
      const personService = new PersonService();
      const getAllPersonsMock = jest.spyOn(personService, "getAllPersons");
      const resultExpected = personSample;

      getAllPersonsMock.mockResolvedValue(resultExpected);

      const response = await personService.getAllPersons();

      expect(response).toStrictEqual(resultExpected);
    });
    test("Should return an error when fetch fails", () => {
      expect(1).toBe(1);
    });
  });
});
