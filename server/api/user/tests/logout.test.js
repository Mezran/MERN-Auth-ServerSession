import mongoose from "mongoose";
import request from "supertest";
import app from "../../../app.js";
import User from "../userModel.js";
import {
  connectDB,
  closeDB,
  clearDB,
  clearSessions,
  createTestUserAndGetCookie,
} from "../../../test/db.js";

describe("DELETE /api/user/logout", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  describe("DELETE /api/user/logout", () => {
    let cookie;
    let testUser;
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
        const result = await createTestUserAndGetCookie("userLogoutTest");
        testUser = result.user;
        cookie = result.cookie;
      });

      afterAll(async () => {
        await clearSessions();
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
