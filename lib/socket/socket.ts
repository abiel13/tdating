const { createServer } = require("http");
const { Server } = require("socket.io");
const User = require("../models/User");
const mongoose = require("mongoose");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket: any) => {
  console.log(socket.id);

  socket.on("sendMessageRequest", async (data: any) => {
    try {
      const { toUserId, message, fromUserId } = data;

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return socket.emit("error", { message: "Recipient user not found" });
      }

      toUser.messageRequests.push({
        fromUserId: mongoose.Types.ObjectId(fromUserId),
        message,
      });

      await toUser.save();
      io.to(toUserId).emit("newMessageRequest", { fromUserId, message });
    } catch (error: any) {
      socket.emit("error", { message: error.message });
    }
  });

  socket.on("handleMessageRequest", async (data: any) => {
    try {
      const { requestId, action, userId } = data;
      const user = await User.findById(userId);

      const request = user.messageRequests.id(requestId);
      if (!request) {
        return socket.emit("error", { message: "Message request not found" });
      }

      if (["Accepted", "Rejected"].includes(action)) {
        request.status = action;
        await user.save();
        socket.emit("messageRequestHandled", { requestId, action });
      } else {
        socket.emit("error", { message: "Invalid action" });
      }
    } catch (error: any) {
      socket.emit("error", { message: error.message });
    }
  });
});

httpServer.listen(5000, () => {
  console.log("Sever is listening on port 5000");
});
