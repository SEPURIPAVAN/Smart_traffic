import React, { useState } from 'react';
import {
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  MapPinIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

function Incidents() {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filter, setFilter] = useState('all');

  // Sample incidents data
  const incidents = [
    {
      id: 1,
      type: 'Accident',
      location: 'MG Road - Brigade Road Junction',
      severity: 'High',
      status: 'Active',
      time: '10:15 AM',
      description: 'Two-vehicle collision blocking northbound lane. Emergency services on scene.',
      coordinates: [12.9716, 77.5946],
      affectedArea: 'Northbound lane of MG Road',
      response: 'Police and ambulance dispatched',
      updates: [
        { time: '10:15 AM', message: 'Incident reported' },
        { time: '10:17 AM', message: 'Emergency services dispatched' },
        { time: '10:20 AM', message: 'Traffic diversion implemented' },
      ]
    },
    {
      id: 2,
      type: 'Road Work',
      location: 'Indiranagar - 100 Feet Road',
      severity: 'Medium',
      status: 'Active',
      time: '09:30 AM',
      description: 'Scheduled road maintenance work. One lane closed.',
      coordinates: [12.9784, 77.6408],
      affectedArea: 'Eastbound lane of 100 Feet Road',
      response: 'Traffic management team on site',
      updates: [
        { time: '09:30 AM', message: 'Work started' },
        { time: '09:35 AM', message: 'Traffic signs placed' },
        { time: '09:40 AM', message: 'Lane closure implemented' },
      ]
    },
    {
      id: 3,
      type: 'Traffic Signal Failure',
      location: 'Koramangala - 80 Feet Road',
      severity: 'High',
      status: 'Resolved',
      time: '08:45 AM',
      description: 'Traffic signal malfunction at intersection. Backup system activated.',
      coordinates: [12.9279, 77.6271],
      affectedArea: 'Koramangala - 80 Feet Road Junction',
      response: 'Signal maintenance team dispatched',
      updates: [
        { time: '08:45 AM', message: 'Signal failure reported' },
        { time: '08:50 AM', message: 'Backup system activated' },
        { time: '09:15 AM', message: 'Issue resolved' },
      ]
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    if (filter === 'all') return true;
    if (filter === 'active') return incident.status === 'Active';
    if (filter === 'resolved') return incident.status === 'Resolved';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Traffic Incidents</h1>
        <div className="flex space-x-2">
          {['all', 'active', 'resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incidents List */}
        <div className="lg:col-span-1 bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Incidents</h2>
          <div className="space-y-4">
            {filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                onClick={() => setSelectedIncident(incident)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedIncident?.id === incident.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500'
                    : 'bg-gray-50 dark:bg-dark-200 hover:bg-gray-100 dark:hover:bg-dark-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">{incident.type}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{incident.location}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(incident.severity)}`}>
                    {incident.severity}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-800 dark:text-white">{incident.time}</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">|</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(incident.status)}`}>
                    {incident.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Details */}
        {selectedIncident && (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {selectedIncident.type}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">{selectedIncident.location}</p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(selectedIncident.severity)}`}>
                    {selectedIncident.severity}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedIncident.status)}`}>
                    {selectedIncident.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-dark-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Reported</h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">{selectedIncident.time}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Affected Area</h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">{selectedIncident.affectedArea}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-dark-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Response</h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">{selectedIncident.response}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">{selectedIncident.description}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Incident Updates</h3>
                <div className="space-y-4">
                  {selectedIncident.updates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 mt-2 rounded-full bg-primary-600"></div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{update.time}</p>
                        <p className="text-gray-800 dark:text-white">{update.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Incidents; 