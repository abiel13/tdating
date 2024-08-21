"use server";
import bcrypt from "bcrypt";
import User from "../models/User";
import { connectToDB } from "../db/connect.";

export async function createUser({
  username,
  fullName,
  thumbnailUrl,
  telegramChatId,
}: CreateUserParams): Promise<any> {
  // Create a new user instance
  try {
    await connectToDB();
    const newUser = new User({
      username,
      fullName,
      thumbnailUrl,
      telegramChatId,
    });

    await newUser.save();
    return JSON.parse(
      JSON.stringify({
        id: newUser._id,
      })
    );
  } catch (error) {
    throw error;
  }
}

export async function getuserById(id: string) {
  try {
    await connectToDB();
    const user = await User.findById(id);
    if (!user) {
      return { message: "User not found" };
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    message: error.message;
  }
}

export async function getuserName(username: string) {
  try {
    await connectToDB();
    const user = await User.find({ username });
    if (!user) {
      return null;
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    throw error;
  }
}

export async function updateUser(id: string, updates: any) {
  try {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      throw new Error("User not found");
    }
    return JSON.parse(JSON.stringify({ data: user }));
  } catch (error) {
    throw error;
  }
}

export async function updateUserByName(username: string, updates: any) {
  try {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findOneAndUpdate({ username }, updates, {
      new: true,
    });
    if (!user) {
      throw new Error("User not found");
    }
    return JSON.parse(JSON.stringify({ data: user }));
  } catch (error) {
    throw error;
  }
}

export async function getUserByLocation(
  longitude: string,
  latitude: string,
  maxDistance = "5000"
) {
  try {
    await connectToDB();
    const users = await User.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseFloat(maxDistance), // Distance in meters
        },
      },
    });
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    throw error;
  }
}
