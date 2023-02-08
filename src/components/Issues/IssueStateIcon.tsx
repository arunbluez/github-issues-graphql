import React from "react";
import { FaRegCheckCircle, FaRegDotCircle } from "react-icons/fa";
import { IssueState } from "../../graphql/__generated__/graphql";

type Props = {
  state: IssueState;
  size?: number;
  withColor?: boolean;
};

export default function IssueStateIcon({
  state,
  size = 24,
  withColor = true,
}: Props) {
  return (
    <>
      {state == IssueState.Open ? (
        <FaRegDotCircle
          size={size}
          className={`${withColor && "text-success"}`}
        />
      ) : (
        <FaRegCheckCircle
          size={size}
          className={`${withColor && "text-secondary"}`}
        />
      )}
    </>
  );
}
