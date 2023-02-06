import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {
  img: string;
  name: string;
};

export default function AvatarGroup({ img, name }: Props) {
  return (
    <div className="dropdown-end dropdown cursor-pointer">
      <div tabIndex={0} className="flex items-center gap-4">
        <p className="text-2xl text-black dark:text-white md:text-3xl">
          {name}
        </p>
        <div className="avatar">
          <div className="w-8 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
            <img src={img} alt="avatar" />
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box my-4 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <a>Profile</a>
        </li>
        <li onClick={() => signOut()}>
          <a>Sign out</a>
        </li>
      </ul>
    </div>
  );
}
