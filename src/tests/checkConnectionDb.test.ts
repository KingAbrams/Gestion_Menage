import checkConnection, { pool } from "../config/checkConnectionDb";
import { mockPool } from "./mocks/pg";

interface QueryResult {
  now: number;
}

// mockPool.mockResolvedValue(mockResult)
// Load Mock
jest.mock("./mocks/pg.ts");

describe("DATABASE check connection", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("When connection is OK, should return DateNow", async () => {
    const mockResult = [{ now: Date.now() }];

    // jest.spyOn(pool, "query").mockResolvedValue(mockResult)

    const result = await checkConnection();

    // expect(result).toEqual(mockResult)
  });
  test("When connection is KO, should return an error", () => {});
});
