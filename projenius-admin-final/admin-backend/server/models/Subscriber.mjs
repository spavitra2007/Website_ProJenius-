import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    subscribed: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

export const Subscriber =
  mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);
