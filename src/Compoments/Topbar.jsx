import { useState} from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import Addnote from '../Pages/Addnote';
import {useDispatch} from 'react-redux';
import {openModal} from '../redux/noteSlice';
import { useTheme } from '../ThemeContext';
import { setSearchText } from '../redux/noteSlice'; 
import React, { useRef } from 'react';
import { useEffect } from 'react';

export default function TopBar() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { darkMode, setDarkMode } = useTheme();

  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
  function handleClickOutside(event) {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
    <div className="w-full flex lg:justify-between justify-end items-center gap-4 px-4 py-3">
      <div className="relative w-[350px] hidden lg:block">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => dispatch(setSearchText(e.target.value))}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-700"
        />
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300 pointer-events-none"
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" >
          <circle cx={11} cy={11} r={7} />
          <line x1={21} y1={21} x2={16.65} y2={16.65} />
        </svg>
      </div>
      <div className='flex items-center gap-4'>
        <button
  onClick={() => setShowSearch(true)}
  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-105 transition-transform block lg:hidden"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
  > <circle cx={11} cy={11} r={7} /> <line x1={21} y1={21} x2={16.65} y2={16.65} />
  </svg>
</button>
        <button onClick={() => dispatch(openModal())} className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition flex items-center gap-2 hidden lg:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Note
        </button>
        <Addnote isOpen={showModal} onClose={() => setShowModal(false)} />
          
        <button onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-105 transition-transform">
          {darkMode ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </button>

        {/* Floating Add Note Button */}
        <button
          onClick={() => dispatch(openModal())}
          className="fixed bottom-6 right-6 z-50 bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition lg:hidden flex items-center justify-center"
          aria-label="Add Note">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
    
        {/* Search Button */}
        {showSearch && (
  <div
    ref={searchRef}
    className="fixed inset-0 z-50 h-20 flex items-start p-4 transition-transform duration-300 ease-in-out"
  >
    <input
      autoFocus
      type="text"
      placeholder="Search..."
      onChange={(e) => dispatch(setSearchText(e.target.value))}
      className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-700"
    />
    <button onClick={() => setShowSearch(false)} className="absolute top-5 right-6 text-xl font-bold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">
      &times;
    </button>
  </div>
)}
      </div>
    </div>
  );
}
