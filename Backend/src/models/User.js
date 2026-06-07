import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    notificationSettings: {
      morning: {
        enabled: {
          type: Boolean,
          default: true,
        },

        time: {
          type: String,
          default: "08:00",
        },
      },

      night: {
        enabled: {
          type: Boolean,
          default: true,
        },

        time: {
          type: String,
          default: "21:00",
        },
      },
    },

    currentStreak: {
      type: Number,
      default: 0,
      min: 0,
    },

    bestStreak: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;