const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("Auth API Endpoints", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user successfully and return user data", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      };

      const response = await request(app)
        .post("/api/auth/register")
        .send(userData);
      expect(response.statusCode).toBe(201);

      expect(response.body.success).toBe(true);
      expect(response.body.user).toHaveProperty("id");
      expect(response.body.user.name).toBe(userData.name);
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user).not.toHaveProperty("password");

      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toContain("token=");

      const dbUser = await User.findOne({ email: userData.email });
      expect(dbUser).toBeTruthy();
      expect(dbUser.name).toBe(userData.name);
    });

    it("should fail registration if validation fails(e.g passwords do not match)", async () => {
      const invalidUserData = {
        name: "Bad User",
        email: "test@example.org",
        password: "password123",
        confirmPassword: "differentPassword",
      };

      const response = await request(app)
        .post("/api/auth/register")
        .send(invalidUserData);

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Data is not valid");
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ field: expect.anything() }),
          expect.objectContaining({ error: expect.anything() }),
        ]),
      );
    });

    it("should fail registration if email already in use", async () => {
      const invalidUserData = {
        name: "Bad User",
        email: "test@example.org",
        password: "password123",
        confirmPassword: "password123",
      };
      const {name, email, password} = invalidUserData;
      await User.create( {name, email, password});

      const response = await request(app)
        .post("/api/auth/register")
        .send(invalidUserData);

      expect(response.statusCode).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("User with this email already exists");
      
    });
  });

  // describe("")
});
