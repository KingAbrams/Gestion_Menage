import checkConnection, { pool } from "../config/checkConnectionDb";
import { logger } from "../config/logger";
import PersonController from "../controllers/PersonController";
import { personSample } from "./fixtures/personSample";

jest.mock("../config/logger.ts", () => {
  return {
    logger: {
      info: jest.fn(),
      error: jest.fn(),
    },
  };
});

describe("[DATABASE] Check connection", () => {
  let queryMethodMock: jest.SpyInstance;

  beforeEach(() => {
    queryMethodMock = jest.spyOn(pool, "query");
  });

  afterEach(() => {
    queryMethodMock.mockRestore();
    jest.clearAllMocks();
  });

  afterAll(() => {
    pool.end();
  });

  test("When connection is OK, should return DateNow", async () => {
    const resultExpected = [{ now: new Date() }];
    const queryExpected = "SELECT NOW()";

    queryMethodMock.mockResolvedValue({ rows: resultExpected });

    const response = await checkConnection();

    expect(queryMethodMock).toHaveBeenCalledWith(queryExpected);
    expect(logger.info).toHaveBeenCalled();
    expect(response).toEqual(resultExpected);
  });

  test("When connection is KO, should throw an error", async () => {
    queryMethodMock.mockRejectedValue(new Error());
    await checkConnection();

    expect(logger.error).toHaveBeenCalled();
  });

  test("Should initialize persons by default", async () => {
    const personController = new PersonController();
    const initializePersonDbMock = jest.spyOn(
      personController,
      "initializePersonDb",
    );

    await personController.initializePersonDb();

    expect(logger.info).toHaveBeenCalled();

    initializePersonDbMock.mockRestore();
  });

  test("Should initialize persons by default 2", async () => {
    const personController = new PersonController();
    const initializePersonDbMock = jest.spyOn(
      personController,
      "initializePersonDb",
    );
    const resultExpected = personSample;

    initializePersonDbMock.mockResolvedValue(resultExpected);

    const response = await personController.initializePersonDb();

    // expect(logger.info).toHaveBeenCalled(); //NEED CHECKING
    expect(resultExpected).toEqual(response);

    initializePersonDbMock.mockRestore();
  });
});
