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

describe("DELETE /api/user", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  describe("DELETE /api/user", () => {
    let cookie;
    let testUser;

    beforeAll(async () => {
      const result = await createTestUserAndGetCookie("userDeleteTest");
      testUser = result.user;
      cookie = result.cookie;
    });

    afterAll(async () => {
      await clearSessions();
    });

    describe("invalid data", () => {
      test("no session: should return 401 and error", async () => {
        const res = await request(app).delete("/api/user");
        expect(res.status).toBe(401);
        expect(res.body.messages).toEqual(["Unauthorized to access resource"]);
      }); // end no session
      test("missing passwordCurrent: should return 400 and error", async () => {
        const res = await request(app).delete("/api/user").set("cookie", cookie).send({});
        expect(res.status).toBe(400);
        expect(res.body.messages).toEqual(["Current password is required"]);
      }); // end missing passwordCurrent
    }); // end invalid data
    describe("valid data", () => {
      test("all valid fields: should return 200 and success message", async () => {
        const res = await request(app).delete("/api/user").set("cookie", cookie).send({
          passwordCurrent: testUser.password,
        });
        expect(res.status).toBe(200);
        expect(res.body.messages).toEqual(["User deleted"]);
        // validate user delete
        const deletedUser = await User.findOne({
          email: testUser.email,
        });
        expect(deletedUser).toBeNull();
      }); // end all valid fields
    }); // end valid data
  }); // end DELETE /api/user
});
