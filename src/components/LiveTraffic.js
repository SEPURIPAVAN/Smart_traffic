import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LiveTraffic() {
  const [selectedZone, setSelectedZone] = useState(null);
  const [timeRange, setTimeRange] = useState('live');
  const [trafficData, setTrafficData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrafficData();
    const interval = setInterval(fetchTrafficData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchTrafficData = async () => {
    try {
      const response = await fetch('/api/traffic');
      const data = await response.json();
      setTrafficData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching traffic data:', error);
      setLoading(false);
    }
  };

  const getCongestionColor = (congestion) => {
    switch (congestion) {
      case 'High':
        return '#ef4444';
      case 'Medium':
        return '#f59e0b';
      case 'Low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Live Traffic Monitoring</h1>
        <div className="flex space-x-2">
          {['live', '1h', '6h', '24h'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg ${
                timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-200'
              }`}
            >
              {range === 'live' ? 'Live' : range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Map */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Traffic Map</h2>
          <div className="h-[500px] rounded-lg overflow-hidden">
            <MapContainer
              center={[12.9716, 77.5946]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {trafficData.map((data) => (
                <CircleMarker
                  key={data._id}
                  center={[data.location.coordinates.lat, data.location.coordinates.lng]}
                  radius={15}
                  pathOptions={{
                    fillColor: getCongestionColor(data.vehicles.congestion),
                    fillOpacity: 0.7,
                    color: 'white',
                    weight: 2
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">{data.location.name}</h3>
                      <p>Vehicles: {data.vehicles.count}</p>
                      <p>Speed: {data.vehicles.speed} km/h</p>
                      <p>Congestion: {data.vehicles.congestion}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Traffic Zones List */}
        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Traffic Zones</h2>
          <div className="space-y-4">
            {trafficData.map((data) => (
              <div
                key={data._id}
                onClick={() => setSelectedZone(data.location.name)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedZone === data.location.name
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500'
                    : 'bg-gray-50 dark:bg-dark-200 hover:bg-gray-100 dark:hover:bg-dark-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800 dark:text-white">{data.location.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    data.vehicles.congestion === 'High'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      : data.vehicles.congestion === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {data.vehicles.congestion}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Vehicles</p>
                    <p className="font-medium text-gray-800 dark:text-white">{data.vehicles.count}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Avg. Speed</p>
                    <p className="font-medium text-gray-800 dark:text-white">{data.vehicles.speed} km/h</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic History Chart */}
      {selectedZone && (
        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Traffic History - {selectedZone}
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData.filter(d => d.location.name === selectedZone)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="timestamp" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="vehicles.count"
                  stroke="#0EA5E9"
                  strokeWidth={2}
                  dot={{ fill: '#0EA5E9' }}
                />
                <Line
                  type="monotone"
                  dataKey="vehicles.speed"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ fill: '#8B5CF6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveTraffic; 