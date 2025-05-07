import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { CalendarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

function Reports() {
  const [dateRange, setDateRange] = useState('week');
  const [selectedReport, setSelectedReport] = useState('traffic');

  // Sample data for traffic volume
  const trafficVolumeData = [
    { time: '00:00', volume: 120 },
    { time: '04:00', volume: 80 },
    { time: '08:00', volume: 450 },
    { time: '12:00', volume: 380 },
    { time: '16:00', volume: 520 },
    { time: '20:00', volume: 280 },
    { time: '24:00', volume: 150 },
  ];

  // Sample data for incident types
  const incidentTypeData = [
    { name: 'Accidents', value: 35 },
    { name: 'Road Work', value: 25 },
    { name: 'Signal Failure', value: 15 },
    { name: 'Other', value: 25 },
  ];

  // Sample data for average speed
  const averageSpeedData = [
    { location: 'MG Road', speed: 35 },
    { location: 'Indiranagar', speed: 45 },
    { location: 'Koramangala', speed: 50 },
    { location: 'Whitefield', speed: 40 },
    { location: 'Electronic City', speed: 55 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Traffic Reports</h1>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {['day', 'week', 'month', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg ${
                  dateRange === range
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-200'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 rounded-lg bg-white dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-200 flex items-center space-x-2">
            <ArrowDownTrayIcon className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Volume Chart */}
        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Traffic Volume</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficVolumeData}>
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
                <Legend />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="#0EA5E9"
                  strokeWidth={2}
                  dot={{ fill: '#0EA5E9' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incident Types Chart */}
        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Incident Types</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incidentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {incidentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Average Speed Chart */}
        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Average Speed by Location</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={averageSpeedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="location" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Legend />
                <Bar dataKey="speed" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Summary Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-dark-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Incidents</h3>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">156</p>
            </div>
            <div className="bg-gray-50 dark:bg-dark-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Response Time</h3>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">12m</p>
            </div>
            <div className="bg-gray-50 dark:bg-dark-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Peak Traffic Hour</h3>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">16:00</p>
            </div>
            <div className="bg-gray-50 dark:bg-dark-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Speed</h3>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">45 km/h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports; 