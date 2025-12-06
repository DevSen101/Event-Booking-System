// tests/booking.test.js
const request = require("supertest");
const app = require("../src/app");

// ---- MOCK EVENT MODEL ----
jest.mock("../src/models/eventModel", () => ({
  getById: jest.fn(() =>
    Promise.resolve({
      id: 1,
      title: "Mock Event",
      price: 100,
      available_seats: 20
    })
  ),
  reduceSeats: jest.fn(() => Promise.resolve())
}));

// ---- MOCK BOOKING MODEL ----
jest.mock("../src/models/bookingModel", () => ({
  create: jest.fn(() => Promise.resolve({ insertId: 5 }))
}));

describe("Booking API Tests", () => {
  test("POST /booking → should create booking", async () => {
    const data = {
      event_id: 1,
      name: "Dev",
      email: "dev@mail.com",
      mobile: "9999999999",
      quantity: 2
    };

    const res = await request(app).post("/booking").send(data);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Booking confirmed");
    expect(res.body.bookingId).toBe(5);
  });
});
