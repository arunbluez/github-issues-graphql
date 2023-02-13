import { useSession } from "next-auth/react";
import React from "react";
import { IssueState } from "../../graphql/__generated__/graphql";
import { useBoundStore } from "../../stores/store";
import IssueStateIcon from "./IssueStateIcon";

export default function IssuesStateBtnGrp({}) {
  const btnState = useBoundStore((state) => state.btnState);
  const setBtnState = useBoundStore((state) => state.setBtnState);
  const { data: session } = useSession();

  const isBtnActive = (state: IssueState) => {
    const classType =
      btnState === IssueState.Open
        ? "bg-green-400 text-black hover:bg-green-600"
        : "bg-secondary text-white hover:bg-secondary-focus";
    return state === btnState ? classType : "";
  };

  return (
    <div className="btn-group">
      <button
        disabled={!session}
        onClick={() => setBtnState(IssueState.Open)}
        className={`btn gap-2 ${isBtnActive(IssueState.Open)}`}
      >
        <IssueStateIcon state={IssueState.Open} withColor={false} />
        <span>Open</span>
      </button>
      <button
        disabled={!session}
        onClick={() => setBtnState(IssueState.Closed)}
        className={`btn gap-2 ${isBtnActive(IssueState.Closed)}`}
      >
        <IssueStateIcon state={IssueState.Closed} withColor={false} />
        <span>Closed</span>
      </button>
    </div>
  );
}
