// imports
import mongoose from "mongoose";
import request from "supertest";
import app from "../../app.js";
import User from "./userModel.js";

describe("Server/api/user", () => {
  // beforeAll
  beforeAll(async () => {
    const mongoDBUrl = process.env.MONGODB_URI_TESTING;
    await mongoose.connect(mongoDBUrl);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe("POST /api/user/register", () => {
    describe("invalid data", () => {
      test("missing all fields: should return 400 and error", async () => {
        const res = await request(app).post("/api/user/register").send({});
        expect(res.status).toBe(400);
        expect(res.body.messages).toEqual([
          "email is a required field",
          "username is a required field",
          "password is a required field",
        ]);
        // console.log(res.body);
      });
    });
  });
});
