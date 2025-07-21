import React from "react";
import Navbar from "../Components/Navbar";
import Topbar from "../Components/Topbar";
import { Outlet } from "react-router-dom";
import Landing from "./Landing";
import { useSelector } from "react-redux";

function Home() {
  const isLoggedIn = useSelector((state) => state.auth.uid);

  return (
    <div className="relative w-full h-screen flex flex-col lg:flex-row bg-zinc-50 dark:bg-zinc-900">
      <div className="lg:hidden sticky top-0 z-10 flex w-full">
        <Navbar />
        {isLoggedIn ? <Topbar /> : <> </>}
      </div>

      {/* Sidebar for large screens only */}
      <div className="hidden lg:block bg-white h-full">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full">
        <div className="hidden lg:block sticky top-0 z-10 w-full">
          {isLoggedIn ? <Topbar /> : <> </>}
        </div>
        {/* Main Content Notes*/}
        <div className="flex-1 overflow-y-auto">
          {isLoggedIn ? <Outlet /> : <Landing />}
        </div>
      </div>
    </div>
  );
}

export default Home;
