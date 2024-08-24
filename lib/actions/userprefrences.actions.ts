"use server";
import { connectToDB } from "../db/connect.";
import User from "../models/User";
import UserPreferences from "../models/userPreference";

interface IUserPreferences {
  userId: string;
  ageRange: { min: number; max: number };
  preferredGender: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  maxDistance: number;
}

interface IUser {
  _id: string;
  username: string;
  fullName: string;
  dateOfBirth: Date;
  gender: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  interests?: string[];
  thumbnailUrl?: string;
  profilePictures?: string[];
}

/**
 * Fetch a feed of possible dates based on the user's preferences.
 * @param {string} userId - The ID of the user for whom to find matches.
 * @returns {Promise<IUser[]>} - A list of matching user profiles.
 */
export async function fetchPossibleDates(userId: string): Promise<any[]> {
  try {
    await connectToDB();
    //Get the user's preferences
    const preferences = await UserPreferences.findOne({ userId }).exec();
    console.log(preferences);
    if (!preferences) {
      throw new Error("User preferences not found.");
    }

    // Prepare the query to match users
    const ageLowerBound = new Date();
    ageLowerBound.setFullYear(
      ageLowerBound.getFullYear() - preferences.ageRange.max
    );

    const ageUpperBound = new Date();
    ageUpperBound.setFullYear(
      ageUpperBound.getFullYear() - preferences.ageRange.min
    );

    const query: any = {
      _id: { $ne: userId },
      gender:
        preferences.preferredGender === "any"
          ? { $exists: true }
          : preferences.preferredGender,
      dateOfBirth: { $gte: ageLowerBound, $lte: ageUpperBound }, // Age range filter
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: preferences.location.coordinates,
          },
          $maxDistance: preferences.maxDistance * 1000, // Put Distance in meters
        },
      },
    };

    const possibleDates = await User.find(query)
      .select(
        "username fullName dateOfBirth gender location interests thumbnailUrl "
      )
      .limit(20) // Limit the number of results
      .lean() // Return plain JavaScript objects for performance
      .exec();

    return possibleDates;
  } catch (error) {
    console.error("Error fetching possible dates:", error);
    throw error;
  }
}

export async function createPreference(id: string) {
  try {
    await connectToDB();
    const newPrefrence = new UserPreferences({
      userId: id,
      location: undefined,
    });

    await newPrefrence.save();
    return JSON.parse(JSON.stringify(newPrefrence));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserPrefrences(userId: string) {
  try {
  } catch (error) {}
}

export async function updateByUserId(userId: string, update: any) {
  try {
    await connectToDB();
    const updatedPrefrence = await UserPreferences.findOneAndUpdate(
      {
        userId,
      },
      update,
      { new: true }
    );
    console.log(updatedPrefrence);
  } catch (error) {
    throw error;
  }
}
