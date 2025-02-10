import mongoose from "mongoose";
import request from "supertest";
import app from "../../../app.js";
import User from "../userModel.js";
import { connectDB, closeDB, clearDB } from "../../../test/db.js";

describe("DELETE /api/user/logout", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  describe("DELETE /api/user/logout", () => {
    let cookie;
    const userLogoutModel = {
      username: "userLogoutTest",
      email: "userLogoutTest@t.t",
      password: "userLogoutTest",
    };
    describe("invalid data", () => {
      test("no session: should return 401 and error", async () => {
        const res = await request(app).delete("/api/user/logout");
        expect(res.status).toBe(401);
        expect(res.body.messages).toEqual(["Unauthorized"]);
      }); // end invalid data
    }); // end no session
    describe("valid data", () => {
      beforeAll(async () => {
        // add user to db
        const newUser = new User(userLogoutModel);
        await newUser.save();
        // get session cookie
        const res = await request(app).post("/api/user/login").send({
          email: userLogoutModel.email,
          password: userLogoutModel.password,
        });
        cookie = res.headers["set-cookie"];
      });
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
      test("with session: should return 200 and user null", async () => {
        const res = await request(app).delete("/api/user/logout").set("cookie", cookie);
        expect(res.status).toBe(200);
        expect(res.body.user).toBeNull();
        expect(res.body.messages).toEqual(["Logged out"]);
        // expect(res.headers["set-cookie"]).toBeDefined();
        // expect session to be cleared
        expect(res.headers["set-cookie"][0]).toMatch(/sid=/);
      }); // end with session
    }); // end valid data
  }); // end DELETE /api/user/logout
});
