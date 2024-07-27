import { createStore } from "zustand/vanilla";
import { getCookies } from "./store.helper";

export interface User {
  location: Location;
  _id: string;
  username: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  interests: string[];
  bio: string;
  profilePictures: string[];
  telegramChatId: string;
  messageRequests: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SavedUser {
  location: Location;
  _id: string;
  username: string;
}

export interface Location {
  type: string;
  coordinates: number[];
}

export type userstate = {
  user: SavedUser | undefined;
};

export type userAction = {
  setUser: (user: SavedUser) => void;
};

const getSavedUser = async (): Promise<SavedUser | undefined> => {
  try {
    const saved = await getCookies("flirtgram-user");
    if (saved) {
      try {
        return JSON.parse(saved.value) as SavedUser;
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
  } catch (error) {
    console.error("Error fetching cookies", error);
  }
  return undefined;
};

const defaultInitState: userstate = {
  user: undefined,
};

// Function to create the store
export const createUserStore = (initState: userstate = defaultInitState) => {
  const store = createStore<userstate & userAction>((set) => ({
    ...initState,
    setUser: (user: SavedUser) => set({ user }),
  }));

  // Fetch and set the user data when creating the store
  (async () => {
    const user = await getSavedUser();
    store.setState({ user });
  })();

  return store;
};
