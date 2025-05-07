import React, { useState } from 'react';
import { ClockIcon, ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function SignalControl() {
  const [selectedIntersection, setSelectedIntersection] = useState(null);
  const [isAutoMode, setIsAutoMode] = useState(true);

  // Sample intersection data
  const intersections = {
    'MG Road - Brigade Road': {
      status: 'Normal',
      currentPhase: 'Phase 2',
      nextPhase: 'Phase 3',
      timeRemaining: 25,
      trafficLevel: 'High',
      emergency: false,
      phases: [
        { id: 1, name: 'Phase 1', duration: 60, active: false },
        { id: 2, name: 'Phase 2', duration: 45, active: true },
        { id: 3, name: 'Phase 3', duration: 60, active: false },
        { id: 4, name: 'Phase 4', duration: 45, active: false },
      ]
    },
    'Indiranagar - 100 Feet Road': {
      status: 'Emergency',
      currentPhase: 'Phase 1',
      nextPhase: 'Phase 2',
      timeRemaining: 15,
      trafficLevel: 'Medium',
      emergency: true,
      phases: [
        { id: 1, name: 'Phase 1', duration: 45, active: true },
        { id: 2, name: 'Phase 2', duration: 60, active: false },
        { id: 3, name: 'Phase 3', duration: 45, active: false },
        { id: 4, name: 'Phase 4', duration: 60, active: false },
      ]
    },
    'Koramangala - 80 Feet Road': {
      status: 'Normal',
      currentPhase: 'Phase 4',
      nextPhase: 'Phase 1',
      timeRemaining: 30,
      trafficLevel: 'Low',
      emergency: false,
      phases: [
        { id: 1, name: 'Phase 1', duration: 60, active: false },
        { id: 2, name: 'Phase 2', duration: 45, active: false },
        { id: 3, name: 'Phase 3', duration: 60, active: false },
        { id: 4, name: 'Phase 4', duration: 45, active: true },
      ]
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Signal Control</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsAutoMode(!isAutoMode)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              isAutoMode
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-200'
            }`}
          >
            <ArrowPathIcon className="h-5 w-5" />
            <span>{isAutoMode ? 'Auto Mode' : 'Manual Mode'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Intersections List */}
        <div className="lg:col-span-1 bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Intersections</h2>
          <div className="space-y-4">
            {Object.entries(intersections).map(([name, data]) => (
              <div
                key={name}
                onClick={() => setSelectedIntersection(name)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedIntersection === name
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500'
                    : 'bg-gray-50 dark:bg-dark-200 hover:bg-gray-100 dark:hover:bg-dark-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800 dark:text-white">{name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    data.status === 'Emergency'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {data.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-800 dark:text-white">{data.timeRemaining}s</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">|</span>
                  <span className="text-gray-800 dark:text-white">{data.currentPhase}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signal Control Panel */}
        {selectedIntersection && (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {selectedIntersection}
                </h2>
                {intersections[selectedIntersection].emergency && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <ExclamationTriangleIcon className="h-5 w-5" />
                    <span className="font-medium">Emergency Mode Active</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-dark-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Phase</h3>
                    <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {intersections[selectedIntersection].currentPhase}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Phase</h3>
                    <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {intersections[selectedIntersection].nextPhase}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-dark-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Remaining</h3>
                    <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {intersections[selectedIntersection].timeRemaining}s
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-dark-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Traffic Level</h3>
                    <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {intersections[selectedIntersection].trafficLevel}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Phase Control</h3>
                <div className="grid grid-cols-2 gap-4">
                  {intersections[selectedIntersection].phases.map((phase) => (
                    <div
                      key={phase.id}
                      className={`p-4 rounded-lg ${
                        phase.active
                          ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500'
                          : 'bg-gray-50 dark:bg-dark-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800 dark:text-white">{phase.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{phase.duration}s</span>
                      </div>
                      {!isAutoMode && (
                        <button
                          className={`mt-2 w-full px-3 py-1 rounded text-sm ${
                            phase.active
                              ? 'bg-primary-600 text-white'
                              : 'bg-white dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-200'
                          }`}
                        >
                          {phase.active ? 'Active' : 'Activate'}
                        </button>
                      )}
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

export default SignalControl; 