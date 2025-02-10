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

describe("GET /api/user/session", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  describe("GET /api/user", () => {
    let cookie;
    const userGetModel = {
      username: "userGetTest",
      email: "userGetTest@t.t",
      password: "userGetTest",
    };
    describe("invalid data", () => {
      test("no session: should return 401 and user null", async () => {
        const res = await request(app).get("/api/user/session");
        expect(res.status).toBe(401);
        expect(res.body.messages).toEqual(["Unauthorized"]);
      });

      test("invalid session data: should return 401 and user null", async () => {
        // Create an invalid cookie
        const invalidCookie = ["connect.sid=s%3AinvalidSession.invalid"];

        const res = await request(app)
          .get("/api/user/session")
          .set("cookie", invalidCookie);

        expect(res.status).toBe(401);
        expect(res.body.messages).toEqual(["Unauthorized"]);
      });
    }); // end invalid data
    describe("valid data", () => {
      let testUser;
      beforeAll(async () => {
        const result = await createTestUserAndGetCookie("userGetTest");
        testUser = result.user;
        cookie = result.cookie;
      });
      afterAll(async () => {
        await clearSessions();
      });
      test("with session: should return 200 and user", async () => {
        const res = await request(app).get("/api/user/session").set("cookie", cookie);
        expect(res.status).toBe(200);
        expect(res.body.user).toEqual({
          username: testUser.username,
          email: testUser.email,
        });
      }); // end with session
    }); // end valid data
  }); // end GET /api/user
});
