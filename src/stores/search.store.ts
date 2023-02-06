import { create, StateCreator } from "zustand";
import { clientEnv } from "../env/schema.mjs";

export interface SearchSlice {
  repoName: string;
  ownerName: string;
  setNames: (input: { repoName: string; ownerName: string }) => void;
}

export const createSearchSlice: StateCreator<SearchSlice> = (set) => ({
  repoName: clientEnv.NEXT_PUBLIC_DEFAULT_REPO!,
  ownerName: clientEnv.NEXT_PUBLIC_DEFAULT_OWNER!,
  setNames: (input) =>
    set((state) => ({
      repoName: input.repoName,
      ownerName: input.ownerName,
    })),
});
