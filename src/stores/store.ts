import { create } from "zustand";
import { createSearchSlice, SearchSlice } from "./search.store";

export const useBoundStore = create<SearchSlice>()((...a) => ({
  ...createSearchSlice(...a),
}));
