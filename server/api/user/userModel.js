import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { compareSync, hashSync } = bcrypt;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      validate: {
        validator: (username) => User.doesNotExist({ username }),
        message: "Username already exists",
      },
    },
    email: {
      type: String,
      validate: {
        validator: (email) => User.doesNotExist({ email }),
        message: "Email already exists",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = hashSync(this.password, 10);
  }
});
// pre update hook to hash password
UserSchema.pre("findOneAndUpdate", function () {
  if (this.getUpdate().password) {
    this.getUpdate().password = hashSync(this.getUpdate().password, 10);
  }
});
UserSchema.statics.doesNotExist = async function (field) {
  return (await this.where(field).countDocuments()) === 0;
};
UserSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};
const User = mongoose.model("User", UserSchema);
export default User;
