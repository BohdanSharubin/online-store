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
      const { name, email, password } = invalidUserData;
      await User.create({ name, email, password });

      const response = await request(app)
        .post("/api/auth/register")
        .send(invalidUserData);

      expect(response.statusCode).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("User with this email already exists");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login user, return user information and set jwt token in cookie", async () => {
      const validUserData = {
        name: "User",
        email: "test@example.org",
        password: "password123",
      };
      await User.create(validUserData);

      const validLoginData = {
        email: validUserData.email,
        password: validUserData.password,
      };

      const response = await request(app)
        .post("/api/auth/login")
        .send(validLoginData);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toHaveProperty("id");
      expect(response.body.user.name).toBe(validUserData.name);
      expect(response.body.user.email).toBe(validUserData.email);
      expect(response.body.user.role).toBe("user");
      expect(response.body.user).not.toHaveProperty("password");

      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toContain("token=");
    });

    it("should fail login user if validation fail", async () => {
      const invalidUserData = {
        name: "Bad User",
        email: "testexample.org",
        password: "password123",
      };

      const invalidLoginData = {
        email: invalidUserData.email,
        password: invalidUserData.password,
      };

      const response = await request(app)
        .post("/api/auth/login")
        .send(invalidLoginData);

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

    it("should fail login user if user not exists", async () => {
      const validUserData = {
        name: "Bad User",
        email: "test@example.org",
        password: "password123",
      };

      const validLoginData = {
        email: validUserData.email,
        password: validUserData.password,
      };

      const response = await request(app)
        .post("/api/auth/login")
        .send(validLoginData);

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Wrong email or password");
    });

    it("should fail login user if passwords do not match", async () => {
      const validUserData = {
        name: "Bad User",
        email: "test@example.org",
        password: "password123",
      };
      await User.create(validUserData);

      const invalidPassword = {
        email: validUserData.email,
        password: "invalidPassword",
      };

      const response = await request(app)
        .post("/api/auth/login")
        .send(invalidPassword);

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Wrong email or password");
    });
  });

  describe("GET /api/auth/me", () => {
    it("should return user information wnen a valid token cookie is provided", async () => {
      const validUserData = {
        name: "User",
        email: "test@example.org",
        password: "password123",
        confirmPassword: "password123",
      };

      const registerResponse = await request(app)
        .post("/api/auth/register")
        .send(validUserData);

      const authCookie = registerResponse.headers["set-cookie"];

      expect(authCookie).toBeDefined();

      const response = await request(app)
        .get("/api/auth/me")
        .set("Cookie", authCookie);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(validUserData.email);
      expect(response.body.user.name).toBe(validUserData.name);
      expect(response.body.user.role).toBe("user");

      expect(response.body.user).not.toHaveProperty("password");
    });

    it("should fail wnen user is not login", async () => {
      const response = await request(app).get("/api/auth/me");

      expect(response.statusCode).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Access denied. Token is missing");
    });
  });
});
