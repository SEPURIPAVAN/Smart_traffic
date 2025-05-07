import React from 'react';
import { 
  BellIcon, 
  UserCircleIcon, 
  SunIcon, 
  MoonIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

function Navbar({ isDarkMode, setIsDarkMode, isSidebarOpen, setIsSidebarOpen, currentPage, setCurrentPage }) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {isSidebarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
            Smart Traffic Management
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setCurrentPage('account')}
              className="flex items-center space-x-2 p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <UserCircleIcon className="h-6 w-6" />
              <span className="text-sm font-medium">John Doe</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 