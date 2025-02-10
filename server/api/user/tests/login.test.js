import request from "supertest";
import app from "../../../app.js";
import User from "../userModel.js";
import { connectDB, closeDB, clearDB, clearSessions } from "../../../test/db.js";

describe("POST /api/user/login", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  describe("POST /api/user/login", () => {
    const userLoginModel = {
      username: "userLoginTest",
      email: "userLoginTest@t.t",
      password: "userLoginTest",
    };
    describe("invalid data", () => {
      test("missing all fields: should return 400 and error", async () => {
        const res = await request(app).post("/api/user/login").send({});
        expect(res.status).toBe(400);
        expect(res.body.messages).toEqual([
          "email is a required field",
          "password is a required field",
        ]);
      }); // end missing all fields
      test("missing email: should return 400 and error", async () => {
        const res = await request(app).post("/api/user/login").send({
          password: userLoginModel.password,
        });
        expect(res.status).toBe(400);
        expect(res.body.messages).toEqual(["email is a required field"]);
      }); // end missing email
      test("missing password: should return 400 and error", async () => {
        const res = await request(app).post("/api/user/login").send({
          email: userLoginModel.email,
        });
        expect(res.status).toBe(400);
        expect(res.body.messages).toEqual(["password is a required field"]);
      }); // end missing password
    }); // end invalid data
    describe("valid data", () => {
      beforeAll(async () => {
        // add user to db
        const newUser = new User(userLoginModel);
        await newUser.save();
      });
      afterAll(async () => {
        await clearSessions();
      });
      test("all valid fields: should return 200 and success message", async () => {
        const res = await request(app).post("/api/user/login").send({
          email: userLoginModel.email,
          password: userLoginModel.password,
        });
        expect(res.status).toBe(200);
        expect(res.body.messages).toEqual(["Logged in"]);
        expect(res.headers["set-cookie"]).toBeDefined();
        expect(res.headers["set-cookie"][0]).toMatch(/sid=/);
        expect(res.headers["set-cookie"][0]).toMatch(/HttpOnly/);
        // expect(res.headers["set-cookie"][0]).toMatch(/Secure/);
        expect(res.headers["set-cookie"][0]).toMatch(/SameSite=Strict/);
      }); // end all valid fields
    }); // end valid data
  }); // end POST /api/user/login
});
