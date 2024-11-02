"use server";

import mongoose from "mongoose";
import User from "../models/User";
import MessageRequests from "../models/message";
import { revalidatePath } from "next/cache";

export const createMessageRequest = async (
  fromUserId: string,
  toUserId: string,
  message: string
) => {
  try {
    // Check if a pending message request already exists from the same user to the same recipient
    const existingRequest = await MessageRequests.findOne({
      fromUserId,
      toUserId,
      status: "Pending",
    });

    if (existingRequest) {
      return "Request Had Already Being Sent";
    }

    // If no duplicate exists, create the new message request
    const messageRequest = new MessageRequests({
      fromUserId,
      toUserId,
      message,
    });

    await messageRequest.save();
    return JSON.parse(JSON.stringify(messageRequest));
  } catch (error) {
    throw error;
  }
};

export const getUserMessageRequest = async (toUserId: string) => {
  try {
    const messageRequests = await MessageRequests.find({
      toUserId,
      status: "Pending",
    }).populate("fromUserId");
    return JSON.parse(JSON.stringify(messageRequests));
  } catch (error) {
    throw error;
  }
};

export const getUserSentMessageRequest = async (fromUserId: string) => {
  try {
    const messageRequests = await MessageRequests.find({
      fromUserId,
    }).populate("toUserId fromUserId");
    return JSON.parse(JSON.stringify(messageRequests));
  } catch (error) {
    throw error;
  }
};

export const getUserViewedMsgReq = async (toUserId: string) => {
  try {
    const messageRequests = await MessageRequests.find({
      toUserId,
      status: { $in: ["Rejected", "Accepted"] },
    }).populate("toUserId fromUserId");
    return JSON.parse(JSON.stringify(messageRequests));
  } catch (error) {
    throw error;
  }
};



export const updateMessageReqStatus = async (
  id: string,
  status: string,
  fromUserId: string,
  toUserId: string,
  path:string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // Update the message request status
    console.log('hello')
    const messageRequest = await MessageRequests.findByIdAndUpdate(
      id,
      { status },
      { new: true, session } // Ensure the update is part of the transaction
    );

    if (!messageRequest) {
      await session.abortTransaction();
      return { error: "Message Request Not Found, Confirm Username" };
    }

    if (status === "Accepted") {
      // Fetch users in parallel as part of the transaction
      const [fromUser, toUser] = await Promise.all([
        User.findById(fromUserId).session(session),
        User.findById(toUserId).session(session),
      ]);

      if (!fromUser || !toUser) {
        await session.abortTransaction();
        return { error: "One or both users not found" };
      }

      // Update matches if users exist
      if (!fromUser.matches.includes(toUserId)) {
        fromUser.matches.push(toUserId);
        await fromUser.save({ session });
      }

      if (!toUser.matches.includes(fromUserId)) {
        toUser.matches.push(fromUserId);
        await toUser.save({ session });
      }
    }

    // Commit transaction after all updates
    await session.commitTransaction();
    revalidatePath(path);
  
    return JSON.parse(JSON.stringify(messageRequest));
  } catch (error:any) {
    await session.abortTransaction(); // Ensure transaction is aborted on error
    return { error: `Failed to update message request status: ${error.message || ""}` };
  } finally {
    session.endSession(); // Ensure session ends after try-catch
  }
};

export const deleteMessageRequest = async (id: string) => {
  try {
    const messageRequest = await MessageRequests.findByIdAndDelete(id);
  } catch (error) {}
};
