const mongoose = require("mongoose");
const { MongoInMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoInMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  process.env.JWT_SECRET = "test_supertest_secret_key_for_jwt";
  process.env.JWT_EXPIRES_IN = "1h";

  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  const collections = mongoose.connections.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
