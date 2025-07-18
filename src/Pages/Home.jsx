import React from "react";
import Navbar from "../Compoments/Navbar";
import Topbar from "../Compoments/Topbar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="relative w-full h-screen flex flex-col lg:flex-row bg-zinc-50 dark:bg-zinc-900">
  <div className="lg:hidden sticky top-0 z-10 flex w-full">
    <Navbar />
    <Topbar />
  </div>

  {/* Sidebar for large screens only */}
  <div className="hidden lg:block bg-white h-full">
    <Navbar />
  </div>

  {/* Main Content Area */}
  <div className="flex-1 flex flex-col h-full">
    <div className="hidden lg:block sticky top-0 z-10 w-full">
      <Topbar />
    </div>
      {/* Main Content Notes*/}
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
    </div>
  </div>
  );
}

export default Home;
