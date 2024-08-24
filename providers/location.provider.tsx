"use client";

import { createLocationStore, locationstore } from "@/lib/store/location.store";
import {
  type ReactNode,
  createContext,
  useRef,
  useContext,

  
} from "react";

import { useStore } from "zustand";

export type locationStoreApi = ReturnType<typeof createLocationStore>;

export const locationContext = createContext<locationStoreApi | null>(null);

export interface LocationStoreProviderProps {
  children: ReactNode;
}

export const LocationStoreProvider = ({
  children,
}: LocationStoreProviderProps) => {
  const locationStoreRef = useRef<locationStoreApi | null>(null);

  if (!locationStoreRef.current) {
    locationStoreRef.current = createLocationStore();
  }

  return (
    <locationContext.Provider value={locationStoreRef.current}>
      {children}
    </locationContext.Provider>
  );
};

export const useLocationStore = <T,>(
  selector: (store: locationstore) => T
): T => {
  const locationStoreContext = useContext(locationContext);

  if (!locationStoreContext) {
    console.log(locationStoreContext);
    throw new Error(
      `uselocationstore must be used within LocationStoreProvider`
    );
  }

  return useStore(locationStoreContext, selector);
};
