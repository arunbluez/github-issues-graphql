import React from "react";
import { FaCaretDown, FaTag } from "react-icons/fa";

type Props = {};

export default function IssuesLabels({}: Props) {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1 gap-2">
        <span className="hidden md:block">Labels</span>
        <FaTag size={24} className="md:hidden" />
        <FaCaretDown size={24} className="hidden md:block" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <a>Label 1</a>
        </li>
        <li>
          <a>Label 1</a>
        </li>
      </ul>
    </div>
  );
}
