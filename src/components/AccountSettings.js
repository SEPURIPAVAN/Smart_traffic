import React, { useState } from 'react';
import { UserCircleIcon, BellIcon, KeyIcon, ShieldCheckIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

function AccountSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Traffic Manager',
    department: 'Traffic Control',
    phone: '+91 98765 43210',
    notifications: {
      email: true,
      push: true,
      sms: false,
      trafficAlerts: true,
      systemUpdates: true,
      maintenanceAlerts: true
    },
    preferences: {
      darkMode: true,
      language: 'English',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24-hour'
    }
  });

  const [editedData, setEditedData] = useState(userData);

  const handleEdit = () => {
    setEditedData(userData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setEditedData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handlePreferenceChange = (type, value) => {
    setEditedData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [type]: value
      }
    }));
  };

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <UserCircleIcon className="h-20 w-20 text-gray-400" />
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full text-white">
                <PencilIcon className="h-4 w-4" />
              </button>
            )}
          </div>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editedData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="text-lg font-medium bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
              />
            ) : (
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{userData.name}</h3>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400">{userData.role}</p>
          </div>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PencilIcon className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <CheckIcon className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              <XMarkIcon className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          {isEditing ? (
            <input
              type="email"
              value={editedData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
          ) : (
            <p className="mt-1 text-gray-900 dark:text-white">{userData.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
          {isEditing ? (
            <input
              type="tel"
              value={editedData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
          ) : (
            <p className="mt-1 text-gray-900 dark:text-white">{userData.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
          {isEditing ? (
            <input
              type="text"
              value={editedData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
          ) : (
            <p className="mt-1 text-gray-900 dark:text-white">{userData.department}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
          <p className="mt-1 text-gray-900 dark:text-white">{userData.role}</p>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Preferences</h3>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PencilIcon className="h-4 w-4" />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <CheckIcon className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              <XMarkIcon className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(isEditing ? editedData.notifications : userData.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <BellIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleNotificationChange(key)}
                disabled={!isEditing}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">User Preferences</h3>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PencilIcon className="h-4 w-4" />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <CheckIcon className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              <XMarkIcon className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
          <select
            value={isEditing ? editedData.preferences.language : userData.preferences.language}
            onChange={(e) => handlePreferenceChange('language', e.target.value)}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Kannada</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Timezone</label>
          <select
            value={isEditing ? editedData.preferences.timezone : userData.preferences.timezone}
            onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          >
            <option>Asia/Kolkata</option>
            <option>Asia/Dubai</option>
            <option>Asia/Singapore</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date Format</label>
          <select
            value={isEditing ? editedData.preferences.dateFormat : userData.preferences.dateFormat}
            onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          >
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time Format</label>
          <select
            value={isEditing ? editedData.preferences.timeFormat : userData.preferences.timeFormat}
            onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
            disabled={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          >
            <option>24-hour</option>
            <option>12-hour</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h2>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'notifications'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'preferences'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          Preferences
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'notifications' && renderNotifications()}
        {activeTab === 'preferences' && renderPreferences()}
      </div>
    </div>
  );
}

export default AccountSettings; 