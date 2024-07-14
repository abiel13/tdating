"use server";
import bcrypt from "bcrypt";
import User from "../models/User";

export async function createUser({
  username,
  email,
  password,
  fullName,
  dateOfBirth,
  gender,
  interests,
  bio,
  profilePictures,
  location,
  telegramChatId,
}: CreateUserParams): Promise<void> {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user instance
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    fullName,
    dateOfBirth,
    gender,
    interests,
    bio,
    profilePictures,
    location,
    telegramChatId,
  });

  // Save the user to the database
  const savedUser = await newUser.save();
}

export async function getuser(id: string) {
  try {
    const user = await User.findById(id);
    if (!user) {
      return { message: "User not found" };
    }
    return { data: user };
  } catch (error: any) {
    message: error.message;
  }
}

export async function getuserName(username: string) {
  try {
    const user = await User.find({ username });
    if (!user) {
      return { message: "User not found" };
    }
    return { data: user };
  } catch (error: any) {
    message: error.message;
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
    return { data: user };
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
    return { data: users };
  } catch (error) {
    throw error;
  }
}
