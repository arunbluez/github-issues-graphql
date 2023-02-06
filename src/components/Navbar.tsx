import { sign } from "crypto";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { FaGithubAlt } from "react-icons/fa";
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
    <div className="navbar">
      <div className="flex-1">
        <a className="btn-ghost btn text-3xl normal-case">
          GitHub Issues Explorer
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
