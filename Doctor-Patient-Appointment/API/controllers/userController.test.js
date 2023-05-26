const request = require("supertest");
const app = require("../server.js");

describe("POST /api/users/Login API", () => {
  beforeAll(async () => {
    jest.setTimeout(200000);
    let url = "/api/register";
    const res = await request(app).post(url).set("accept", "application/json");
  });
  console.log("Hello");
  it("should return HTTP status code 200 and success message for a successful user/login", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ username: "testuser", password: "password123" });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login successful");
  });

  it("should return HTTP status code 401 and error message for an invalid username", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ username: "invaliduser", password: "password123" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid credentials");
  });

  it("should return HTTP status code 401 and error message for an invalid password", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ username: "testuser", password: "invalidpassword" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid credentials");
  });

  it("should return HTTP status code 400 and error message for missing username", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ password: "password123" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid request");
  });

  it("should return HTTP status code 400 and error message for missing password", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ username: "testuser" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid request");
  });

  // Add more test cases as needed
});
