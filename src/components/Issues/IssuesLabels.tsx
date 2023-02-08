import React from "react";
import { FaCaretDown, FaTag } from "react-icons/fa";
import { IssuesLabelsQueryQuery } from "../../graphql/__generated__/graphql";

type Props = {
  issueLabels: IssuesLabelsQueryQuery;
};

type LabelItemProp = {
  item: string;
  color: string;
};

export default function IssuesLabels({ issueLabels }: Props) {
  const LabelItem = ({ item, color }: LabelItemProp) => (
    <span
      className={`rounded-full border px-3 py-1 ${
        "border-[#" +
        color +
        "] " +
        "text-[#" +
        color +
        "] " +
        "bg-[#" +
        color +
        "]"
      } bg-opacity-50`}
    >
      {item}
    </span>
  );

  return (
    <div className="dropdown-end dropdown dropdown-bottom">
      <label tabIndex={0} className="btn m-1 gap-2">
        <span className="hidden md:block">Labels</span>
        <FaTag size={24} className="md:hidden" />
        <FaCaretDown size={24} className="hidden md:block" />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content menu rounded-box w-96 bg-base-100 p-2 shadow"
      >
        <div className="flex flex-wrap justify-center gap-2">
          {issueLabels.repository?.labels?.nodes?.map((x, i) => (
            <div key={i}>
              <LabelItem item={x?.name!} color={x?.color!} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
