import React from "react";
import { FaGithubAlt } from "react-icons/fa";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="navbar">
      <div className="flex-1">
        <a className="btn-ghost btn text-3xl normal-case">
          GitHub Issues Explorer
        </a>
      </div>
      <div className="flex-none">
        <button className="btn-primary btn gap-2">
          <FaGithubAlt size={24} />
          Signin with GitHub
        </button>
      </div>
    </div>
  );
}
