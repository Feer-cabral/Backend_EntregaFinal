const request = require("supertest");
const app = require("../src/app");

describe("Test API Endpoints", () => {
  it("GET /login - Should return login page", async () => {
    const response = await request(app).get("/login");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Iniciar sesión");
  });

  it("POST /login - Should login user", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "password123" });
    expect(response.statusCode).toBe(302);
    expect(response.header.location).toBe("/profile");
  });
});
