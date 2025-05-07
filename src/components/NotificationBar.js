import React, { useState } from 'react';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

function NotificationBar() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      message: 'Heavy traffic detected on MG Road',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'info',
      message: 'System maintenance scheduled for tonight',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'success',
      message: 'Traffic signal optimization completed',
      time: '3 hours ago'
    }
  ]);

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'alert':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  return (
    <div className="fixed top-16 right-4 z-50 w-80 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getNotificationColor(notification.type)} border rounded-lg shadow-lg p-4 transition-all duration-300`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <BellIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationBar; 