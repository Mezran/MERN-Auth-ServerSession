import mongoose from "mongoose";
import request from "supertest";
import app from "../../../app.js";
import User from "../userModel.js";
import { connectDB, closeDB, clearDB } from "../../../test/db.js";

describe("DELETE /api/user", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  describe("DELETE /api/user", () => {
    const userDeleteModel = {
      username: "userDeleteTest",
      email: "userDeleteTest@t.t",
      password: "userDeleteTest",
    };
    let cookie;
    beforeAll(async () => {
      // add user to db
      const newUser = new User(userDeleteModel);
      await newUser.save();
      // get session cookie
      const res = await request(app).post("/api/user/login").send({
        email: userDeleteModel.email,
        password: userDeleteModel.password,
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
          passwordCurrent: userDeleteModel.password,
        });
        expect(res.status).toBe(200);
        expect(res.body.messages).toEqual(["User deleted"]);
        // validate user delete
        const deletedUser = await User.findOne({
          email: userDeleteModel.email,
        });
        expect(deletedUser).toBeNull();
      }); // end all valid fields
    }); // end valid data
  }); // end DELETE /api/user
});
