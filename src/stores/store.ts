import { create } from "zustand";
import { createIssueSlice, IssueSlice } from "./issues.store";
import { createSearchSlice, SearchSlice } from "./search.store";

export const useBoundStore = create<SearchSlice & IssueSlice>()((...a) => ({
  ...createSearchSlice(...a),
  ...createIssueSlice(...a),
}));
