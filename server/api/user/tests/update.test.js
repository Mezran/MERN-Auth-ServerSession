import mongoose from "mongoose";
import request from "supertest";
import app from "../../../app.js";
import User from "../userModel.js";
import { connectDB, closeDB, clearDB } from "../../../test/db.js";

describe("PATCH /api/user", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  describe("PATCH /api/user", () => {
    const userUpdateModelInitial = {
      username: "userUpdateTest",
      email: "userUpdateTest@t.t",
      password: "userUpdateTest",
    };
    const userUpdateModel1 = {
      username: "userUpdateTest1",
      password: "userUpdateTest1",
    };
    const userUpdateModel2 = {
      username: "userUpdateTest2",
      password: "userUpdateTest2",
    };
    let cookie;
    beforeAll(async () => {
      // add user to db
      const newUser = new User(userUpdateModelInitial);
      await newUser.save();
      // get session cookie
      const res = await request(app).post("/api/user/login").send({
        email: userUpdateModelInitial.email,
        password: userUpdateModelInitial.password,
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
        const res = await request(app).patch("/api/user/").send({});
        expect(res.status).toBe(401);
        expect(res.body.messages).toEqual(["Unauthorized to access resource"]);
      }); // end no session
      test("missing all fields: should return 400 and error", async () => {
        const res = await request(app).patch("/api/user").set("cookie", cookie).send({});
        expect(res.status).toBe(400);
        expect(res.body.messages).toEqual(["No changes submitted"]);
      }); // end missing all fields
      test("missing passwordCurrent: should return 400 and error", async () => {
        const res = await request(app).patch("/api/user").set("cookie", cookie).send({
          username: userUpdateModel1.username,
          email: userUpdateModel1.email,
          password: userUpdateModel1.password,
        });
        expect(res.status).toBe(400);
        expect(res.body.messages).toEqual(["Current password is required"]);
      }); // end missing passwordCurrent
    }); // end invalid data
    describe("valid data", () => {
      test("all valid fields: should return 200 and success message", async () => {
        const res = await request(app).patch("/api/user").set("cookie", cookie).send({
          username: userUpdateModel1.username,
          password: userUpdateModel1.password,
          passwordCurrent: userUpdateModelInitial.password,
        });
        expect(res.status).toBe(200);
        expect(res.body.messages).toEqual(["User updated"]);
        // validate user update
        const updatedUser = await User.findOne({
          email: userUpdateModelInitial.email,
        });
        expect(updatedUser.username).toBe(userUpdateModel1.username);
        expect(updatedUser.email).toBe(userUpdateModelInitial.email);
        expect(updatedUser.comparePasswords(userUpdateModel1.password)).toBe(true);
      }); // end all valid fields
      test("valid username only: should return 200 and success message", async () => {
        const res = await request(app).patch("/api/user").set("cookie", cookie).send({
          username: userUpdateModel2.username,
          passwordCurrent: userUpdateModel1.password,
        });
        expect(res.status).toBe(200);
        expect(res.body.messages).toEqual(["User updated"]);
        // validate user update
        const updatedUser = await User.findOne({
          email: userUpdateModelInitial.email,
        });
        expect(updatedUser.username).toBe(userUpdateModel2.username);
        expect(updatedUser.email).toBe(userUpdateModelInitial.email);
        expect(updatedUser.comparePasswords(userUpdateModel1.password)).toBe(true);
      }); // end valid username only
      test("valid password only: should return 200 and success message", async () => {
        const res = await request(app).patch("/api/user").set("cookie", cookie).send({
          password: userUpdateModel2.password,
          passwordCurrent: userUpdateModel1.password,
        });
        expect(res.status).toBe(200);
        expect(res.body.messages).toEqual(["User updated"]);
        // validate user update
        const updatedUser = await User.findOne({
          email: userUpdateModelInitial.email,
        });
        expect(updatedUser.username).toBe(userUpdateModel2.username);
        expect(updatedUser.email).toBe(userUpdateModelInitial.email);
        expect(updatedUser.comparePasswords(userUpdateModel2.password)).toBe(true);
      }); // end valid password only
    }); // end valid data
  }); // end PATCH /api/user
});
