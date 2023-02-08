import { sign } from "crypto";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaDumpsterFire, FaGithubAlt, FaLessThan } from "react-icons/fa";
import AvatarGroup from "./AvatarGroup";
import SearchRepos from "./SearchRepos";

type Props = {
  showBack?: boolean;
};

const DynamicSearchRepos = dynamic(() => import("../components/SearchRepos"));

export default function Navbar({ showBack = false }: Props) {
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
    <>
      <div className="navbar items-center px-4">
        <div className="flex-1 items-center">
          <Link
            href={"/"}
            className="mr-4 flex items-center gap-2 text-3xl normal-case text-white no-underline"
          >
            <FaDumpsterFire size={60} className="text-secondary" />
            <p className="flex flex-col items-start gap-0">
              <span className="p-0">GitHub</span>
              <span className="-mt-1 pl-1 text-sm md:-mt-2 md:text-lg">
                Issues Explorer
              </span>
            </p>
          </Link>
          {!showBack ? (
            <div className="hidden md:block">
              <DynamicSearchRepos />
            </div>
          ) : (
            <Link href={"/"} className="btn hidden gap-2 md:flex">
              <FaLessThan /> Back
            </Link>
          )}
        </div>
        <div className="flex-none gap-4">
          {!session ? (
            <button onClick={() => sign()} className="btn btn-primary gap-2">
              <FaGithubAlt size={24} />
              {isSigningIn ? "Signing in..." : "Signin GitHub"}
            </button>
          ) : (
            <AvatarGroup
              img={session?.user?.image!}
              name={session?.user?.name!}
            />
          )}
        </div>
      </div>
      <div className="block w-full md:hidden">
        <DynamicSearchRepos />
      </div>
    </>
  );
}
