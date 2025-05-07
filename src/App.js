import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LiveTraffic from './components/LiveTraffic';
import SignalControl from './components/SignalControl';
import Incidents from './components/Incidents';
import Reports from './components/Reports';
import NotificationBar from './components/NotificationBar';
import AccountSettings from './components/AccountSettings';
import 'leaflet/dist/leaflet.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'live-traffic':
        return <LiveTraffic />;
      case 'signal-control':
        return <SignalControl />;
      case 'incidents':
        return <Incidents />;
      case 'reports':
        return <Reports />;
      case 'account':
        return <AccountSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <NotificationBar />
      <div className="flex">
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isSidebarOpen={isSidebarOpen}
        />
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App; 