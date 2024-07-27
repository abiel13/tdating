"use client";

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
} from "react";
import { useStore } from "zustand";

import {
  type userstore,
  createUserStore,
  SavedUser,
} from "@/lib/store/user.store";
import { getCookies } from "@/lib/store/store.helper";

export type userStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<userStoreApi | null>(null);

export interface UserStoreProviderProps {
  children: ReactNode;
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const storeRef = useRef<userStoreApi | null>(null);

  // Initialize store if it hasn't been initialized yet
  if (!storeRef.current) {
    storeRef.current = createUserStore();
  }

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

  useEffect(() => {
    const initializeStore = async () => {
      const user = await getSavedUser();
      if (storeRef.current) {
        if (user) {
          storeRef.current.setState({ user });
        }
      }
    };

    initializeStore();
  }, []);

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: userstore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
