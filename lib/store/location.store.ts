import { createStore } from "zustand/vanilla";

export interface locationState {
  saved: boolean;
}

const defaultInitState: locationState = {
  saved: false,
};

export type locationAction = {
  setSaved: (value: boolean) => void;
};

export type locationstore = locationState & locationAction;

export const createLocationStore = (
  initState: locationState = defaultInitState
) => {
  const store = createStore<locationstore>((set) => ({
    ...initState,
    setSaved: (value: boolean) => set({ saved: value }),
  }));

  return store;
};
