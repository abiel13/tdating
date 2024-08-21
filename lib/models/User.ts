import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary", "Other"],
  },
  interests: {
    type: [String],
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  thumbnailUrl: {
    type: String,
  },
  profilePictures: {
    type: [String], // URLs to profile pictures
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  onBoarded: {
    type: Boolean,
    default: false,
  },
  telegramChatId: {
    type: String,
    unique: true,
    sparse: true, // Allows for unique but nullable field
  },
  messageRequests: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "MessageRequest",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating a 2dsphere index to enable location-based queries
userSchema.index({ location: "2dsphere" });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
