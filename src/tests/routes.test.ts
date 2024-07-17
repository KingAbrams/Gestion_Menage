import express from "express";
import request from "supertest";
import { pool } from "../config/checkConnectionDb";
import bodyParser from "body-parser";
import personRoutes from "../core/routes/personRoute";
import { PrismaClient } from "@prisma/client";

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
  test("[ GET /api/persons ] Should return 200 and a list of persons ", async () => {
    const response = await request(app).get("/api/persons");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Fetch successful");
    expect(response.body).toHaveProperty("data");
  });
});
