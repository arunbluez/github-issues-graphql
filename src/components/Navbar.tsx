import { sign } from "crypto";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { FaDumpsterFire, FaGithubAlt } from "react-icons/fa";
import AvatarGroup from "./AvatarGroup";
import SearchRepos from "./SearchRepos";

type Props = {};

const DynamicSearchRepos = dynamic(() => import("../components/SearchRepos"));

export default function Navbar({}: Props) {
  const { data: session } = useSession();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const sign = async () => {
    setIsSigningIn(true);
    await signIn("github");
  };

  useEffect(() => {
    if (session) {
      setIsSigningIn(false);
    }
    return () => {
      setIsSigningIn(false);
    };
  }, [session]);

  return (
    <div className="navbar items-center px-4">
      <div className="flex-1 items-center">
        <a className="mr-4 flex items-center gap-2 text-3xl normal-case">
          <FaDumpsterFire size={60} className="text-secondary" />
          <p className="flex flex-col items-start gap-0">
            <span className="p-0">GitHub</span>
            <span className="-mt-2 pl-1 text-lg">Issues Explorer</span>
          </p>
        </a>
        <DynamicSearchRepos />
      </div>
      <div className="flex-none gap-4">
        {!session ? (
          <button onClick={() => sign()} className="btn-primary btn gap-2">
            <FaGithubAlt size={24} />
            {isSigningIn ? "Signing in..." : "Signin with GitHub"}
          </button>
        ) : (
          <AvatarGroup
            img={session?.user?.image!}
            name={session?.user?.name!}
          />
        )}
      </div>
    </div>
  );
}
