import mongoose from "mongoose";

const messageRequestsSchema = new mongoose.Schema({
  request: {
    type: [
      {
        fromUserId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Rejected"],
          default: "Pending",
        },
        requestDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
});

const MessageRequests =
  mongoose.models.MessageRequest ||
  mongoose.model("MessageRequest", messageRequestsSchema);

export default MessageRequests;
