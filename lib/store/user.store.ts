import { createStore } from "zustand/vanilla";

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
  id: string;
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

export type userstore = userstate & userAction;

const defaultInitState: userstate = {
  user: undefined,
};

// Function to create the store
export const createUserStore = (initState: userstate = defaultInitState) => {
  const store = createStore<userstore>((set) => ({
    ...initState,
    setUser: (user: SavedUser) => set({ user }),
  }));

  return store;
};
