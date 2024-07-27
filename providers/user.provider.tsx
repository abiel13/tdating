"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type userstore, createUserStore } from "@/lib/store/user.store";

export type userStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<userStoreApi | null>(null);

export interface UserStoreProviderProps {
  children: ReactNode;
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const storeRef = useRef<userStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createUserStore();
  }

  return (
    <UserStoreContext.Provider
     value={storeRef.current}>
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
