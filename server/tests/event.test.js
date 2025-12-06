// tests/event.test.js
const request = require("supertest");
const app = require("../src/app");

// ---- BYPASS ADMIN MIDDLEWARE ----
jest.mock("../src/middlewares/adminMiddleware", () => (req, res, next) => next());

// ---- MOCK EVENT MODEL (NO MYSQL CALLS) ----
jest.mock("../src/models/eventModel", () => ({
  create: jest.fn(() => Promise.resolve({ insertId: 10 })),
  getAll: jest.fn(() =>
    Promise.resolve([{ id: 1, title: "Mock Event", available_seats: 50 }])
  ),
  getById: jest.fn(() =>
    Promise.resolve({ id: 1, title: "Mock Event", available_seats: 50 })
  ),
  update: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve())
}));

describe("Event API Tests", () => {
  test("POST /events → should create event", async () => {
    const data = {
      title: "Test Event",
      description: "desc",
      price: 200,
      total_seats: 50,
      location: "Delhi"
    };

    const res = await request(app).post("/events").send(data);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Event created");
    expect(res.body.eventId).toBe(10);
  });

  test("GET /events → should return list", async () => {
    const res = await request(app).get("/events");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /events/:id → should return one event", async () => {
    const res = await request(app).get("/events/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });
});
