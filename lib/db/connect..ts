import mongoose from "mongoose";


// Configures mongoose to omit unknown fields in queries.
// See https://mongoosejs.com/docs/guide.html#strictQuery for more information
mongoose.set("strictQuery", true);

const { MONGODB_URI = "" } = process.env;

let isConnected = false;
let isConnecting = false;

export const connectToDB = async (): Promise<void> => {
  if (isConnecting) {
    throw new Error("MongoDB connection is already in progress...");
  } else if (isConnected) {
    throw new Error("A connection to MongoDB has already been established");
  }

  isConnecting = true;

  try {
    await mongoose.connect(MONGODB_URI ?? "");
    isConnected = true;
  } catch (err: any) {
    console.log(err);
  }

  isConnecting = false;
};
