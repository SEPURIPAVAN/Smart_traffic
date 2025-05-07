import React, { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  TruckIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

function Dashboard() {
  const [timeRange, setTimeRange] = useState('today');

  // Sample data for prediction graph
  const predictionData = [
    { time: '10:00', vehicles: 400 },
    { time: '10:15', vehicles: 450 },
    { time: '10:30', vehicles: 500 },
    { time: '10:45', vehicles: 480 },
    { time: '11:00', vehicles: 520 },
  ];

  // Sample data for incidents
  const incidents = [
    {
      id: 1,
      location: 'MG Road',
      type: 'Accident',
      severity: 'High',
      time: '10:15 AM',
    },
    {
      id: 2,
      location: 'Indiranagar',
      type: 'Road Work',
      severity: 'Medium',
      time: '09:30 AM',
    },
    {
      id: 3,
      location: 'Koramangala',
      type: 'Signal Failure',
      severity: 'High',
      time: '08:45 AM',
    },
  ];

  // Sample data for traffic zones
  const trafficZones = [
    {
      name: 'MG Road',
      congestion: 'High',
      vehicles: 450,
      speed: 35,
    },
    {
      name: 'Indiranagar',
      congestion: 'Medium',
      vehicles: 300,
      speed: 45,
    },
    {
      name: 'Koramangala',
      congestion: 'Low',
      vehicles: 250,
      speed: 50,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <div className="flex space-x-2">
          {['today', 'week', 'month'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg ${
                timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Vehicles</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">1,234</p>
            </div>
            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <TruckIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 dark:text-green-400">+12.5%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">from last hour</span>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Incidents</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">3</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-500 dark:text-red-400">+1</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">new in last 30m</span>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Response Time</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">12m</p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 dark:text-green-400">-2m</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">from last hour</span>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Signal Efficiency</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">92%</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 dark:text-green-400">+3%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">from last hour</span>
          </div>
        </div>
      </div>

      {/* Emergency Alert */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 animate-pulse">
        <div className="flex items-center space-x-3">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          <div>
            <p className="text-red-800 dark:text-red-400 font-medium">Emergency Vehicle Approaching</p>
            <p className="text-sm text-red-600 dark:text-red-500">Ambulance en route to MG Road - ETA: 5 minutes</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Heatmap */}
        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Traffic Heatmap</h2>
          <div className="h-80 bg-gradient-to-br from-green-500 via-yellow-500 to-red-500 rounded-lg">
            {/* Map visualization will be implemented here */}
            <div className="h-full flex items-center justify-center">
              <p className="text-white font-medium">Live traffic heatmap visualization</p>
            </div>
          </div>
        </div>

        {/* AI Prediction */}
        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">AI Traffic Prediction</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="vehicles"
                  stroke="#0EA5E9"
                  fill="#0EA5E9"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Incidents</h2>
          <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {incidents.map((incident) => (
                <tr key={incident.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                    {incident.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                    {incident.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        incident.severity === 'High'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}
                    >
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                    {incident.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 