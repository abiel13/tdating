"use server";

import MessageRequests from "../models/message";

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

export const updateMessageReqStatus = async (id: string, status: string) => {
  try {
    const messageRequest = await MessageRequests.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!messageRequest) {
      return "Message Request Not Found Confirm Username";
    }

    return JSON.parse(JSON.stringify(messageRequest));
  } catch (error) {
    throw error;
  }
};

export const deleteMessageRequest = async (id: string) => {
  try {
    const messageRequest = await MessageRequests.findByIdAndDelete(id);
  } catch (error) {}
};
