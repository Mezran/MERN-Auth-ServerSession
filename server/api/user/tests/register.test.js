import mongoose from "mongoose";
import request from "supertest";
import app from "../../../app.js";
import { connectDB, closeDB, clearDB } from "../../../test/db.js";

describe("POST /api/user/register", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  describe("POST /api/user/register", () => {
    const userRegisterModel = {
      username: "userRegisterTest",
      email: "userRegisterTest@t.t",
      password: "userRegisterTest",
    };
    describe("invalid data", () => {
      test("missing all fields: should return 400 and error", async () => {
        const res = await request(app).post("/api/user/register").send({});
        expect(res.status).toBe(400);
        expect(res.body.messages).toEqual([
          "email is a required field",
          "username is a required field",
          "password is a required field",
        ]);
      }); // end missing all fields
      test("missing email: should return 400 and error", async () => {
        const res = await request(app).post("/api/user/register").send({
          username: userRegisterModel.username,
          password: userRegisterModel.password,
        });
        expect(res.status).toBe(400);
        expect(res.body.messages).toEqual(["email is a required field"]);
      }); // end missing email
      test("missing username: should return 400 and error", async () => {
        const res = await request(app).post("/api/user/register").send({
          email: userRegisterModel.email,
          password: userRegisterModel.password,
        });
        expect(res.status).toBe(400);
        expect(res.body.messages).toEqual(["username is a required field"]);
      }); // end missing username
      test("missing password: should return 400 and error", async () => {
        const res = await request(app).post("/api/user/register").send({
          email: userRegisterModel.email,
          username: userRegisterModel.username,
        });
        expect(res.status).toBe(400);
        expect(res.body.messages).toEqual(["password is a required field"]);
      }); // end missing password
    }); // end invalid data
    describe("valid data", () => {
      afterAll(async () => {
        // drop session collection if it exists
        const collections = await mongoose.connection.db.listCollections().toArray();
        const sessionCollectionExists = collections.some(
          (collection) => collection.name === "session"
        );

        if (sessionCollectionExists) {
          await mongoose.connection.db.collection("session").drop();
        }
      });
      test("all valid fields: should return 200 and success message", async () => {
        const res = await request(app).post("/api/user/register").send(userRegisterModel);
        expect(res.status).toBe(200);
        expect(res.body.messages).toEqual(["User registered"]);
        expect(res.headers["set-cookie"]).toBeDefined();
        expect(res.headers["set-cookie"][0]).toMatch(/sid=/);
        expect(res.headers["set-cookie"][0]).toMatch(/HttpOnly/);
        // expect(res.headers["set-cookie"][0]).toMatch(/Secure/);
        expect(res.headers["set-cookie"][0]).toMatch(/SameSite=Strict/);
      }); // end all valid fields
    }); // end valid data
  }); // end POST /api/user/register
});
