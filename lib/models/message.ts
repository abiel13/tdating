import mongoose from "mongoose";

const messageRequestsSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // Indexing for faster queries
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
    index: true,
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
});

const MessageRequests =
  mongoose.models.MessageRequest ||
  mongoose.model("MessageRequest", messageRequestsSchema);

export default MessageRequests;
