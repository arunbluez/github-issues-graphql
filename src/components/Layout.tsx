import React from "react";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="flex w-full flex-col pl-0 md:space-y-4 md:p-4">
        <Navbar />
        {children}
      </div>
    </main>
  );
}
