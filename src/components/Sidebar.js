import React from 'react';
import {
  HomeIcon,
  MapIcon,
  SignalIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

function Sidebar({ currentPage, setCurrentPage, isSidebarOpen }) {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
    { id: 'live-traffic', name: 'Live Traffic', icon: MapIcon },
    { id: 'signal-control', name: 'Signal Control', icon: SignalIcon },
    { id: 'incidents', name: 'Incidents', icon: ExclamationTriangleIcon },
    { id: 'reports', name: 'Reports', icon: ChartBarIcon },
    { id: 'account', name: 'Account', icon: UserCircleIcon }
  ];

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentPage(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === tab.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{tab.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar; 