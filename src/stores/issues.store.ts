import { create, StateCreator } from "zustand";
import {
  Issue,
  IssuesListQueryQuery,
  IssueState,
} from "../graphql/__generated__/graphql";
import produce from "immer";

export interface IssueSlice {
  btnState: IssueState;
  searchText: string;
  issueListStore: IssuesListQueryQuery;
  searchState: boolean;
  isSearchQueryLoading: boolean;
  setBtnState: (input: IssueState) => void;
  setSearchText: (input: string) => void;
  setSearchState: (input: boolean) => void;
  setIsSearchQueryLoading: (input: boolean) => void;
  setIssuesListStore: (input: IssuesListQueryQuery) => void;
  setIssuesNode: (input: Issue[]) => void;
}

export const createIssueSlice: StateCreator<IssueSlice> = (set) => ({
  btnState: IssueState.Open,
  searchText: "",
  issueListStore: {},
  searchState: false,
  isSearchQueryLoading: false,
  setBtnState: (input) =>
    set((state) => ({
      btnState: input,
    })),
  setSearchState: (input) =>
    set((state) => ({
      searchState: input,
    })),
  setSearchText: (input) =>
    set((state) => ({
      searchText: input,
    })),
  setIsSearchQueryLoading: (input) =>
    set((state) => ({
      isSearchQueryLoading: input,
    })),
  setIssuesListStore: (input) =>
    set(
      (state) => ({
        ...state,
        issueListStore: { ...input },
      }),
      true
    ),
  setIssuesNode: (input) =>
    set(
      produce((state) => {
        state.issueListStore.repository.issues.nodes = [...input];
      })
    ),
});
