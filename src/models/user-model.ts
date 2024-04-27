import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    clerkUserId: {
      type: String,
      require: true,
    },
    profilePic: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["users"]) {
  delete mongoose.models["users"];
}

const UserModel = mongoose.model("users", userSchema);
export default UserModel;
