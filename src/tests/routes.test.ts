import express from "express";
import request from "supertest";
import { pool } from "../config/checkConnectionDb";
import bodyParser from "body-parser";
import personRoutes from "../core/routes/personRoute";
import { PrismaClient } from "@prisma/client";
import { personSample } from "./fixtures/personSample";

const app = express();

app.use(bodyParser.json());

app.use("/", personRoutes);

afterEach(async () => {
  const prisma = new PrismaClient();
  await prisma.person.deleteMany({});
});

afterAll(async () => {
  await pool.end();
});

describe("[PERSON ROUTES]", () => {
  const urlPerson = "/api/persons";

  test("[ 404 Route ] Should return 404 and ressource not found", async () => {
    const msgText = "Resource not found, try another URL";
    const nonExistentRoute = "/non-existent-route";
    const response = await request(app).get(nonExistentRoute);

    expect(response.status).toBe(404);
    expect(response.text).toBe(msgText);
  });

  test("[ GET / ] Should return 200 and the title of the projet", async () => {
    const title = "Household Management";
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe(title);
  });

  test("[ GET /api/persons ] Should return 200 and a list of persons ", async () => {
    const msgFetch = "Fetch successful";
    const response = await request(app).get(urlPerson);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", msgFetch);
    expect(response.body).toHaveProperty("data");
  });

  test("[ POST /api/persons ] Should return 201 and the created person ", async () => {
    const msgCreate = "Creation successful";
    const newPerson = personSample[0];

    const response = await request(app).post(urlPerson).send(newPerson);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", msgCreate);
    expect(response.body).toHaveProperty("data");
  });

  test("[ GET /api/persons/:id ] Should return 200 and the specified person ", async () => {
    const msgFetch = "Fetch successful";
    const newPerson = personSample[0];
    const createResponse = await request(app).post(urlPerson).send(newPerson);
    const personId = createResponse.body.data.id;

    const response = await request(app).get(`${urlPerson}/${personId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", msgFetch);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.id).toBe(personId);
  });

  test("[ PUT /api/persons/:id ] Should return 201 and the updated person ", async () => {
    const msgUpdate = "Update successful";
    const newPerson = personSample[0];
    const createResponse = await request(app).post(urlPerson).send(newPerson);
    const personId = createResponse.body.data.id;

    const lastnameValue = "Evenn";
    const updatedPerson = { ...newPerson, lastname: lastnameValue };
    const response = await request(app)
      .put(`${urlPerson}/${personId}`)
      .send(updatedPerson);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", msgUpdate);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.lastname).toBe(lastnameValue);
  });

  test("[ DELETE /api/persons/:id ] Should return 200 and message deletion successful ", async () => {
    const msgDelete = "Deletion successful";
    const newPerson = personSample[0];
    const createResponse = await request(app).post(urlPerson).send(newPerson);
    const personId = createResponse.body.data.id;

    const response = await request(app).delete(`${urlPerson}/${personId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", msgDelete);
    expect(response.body).toHaveProperty("data");
  });
});
