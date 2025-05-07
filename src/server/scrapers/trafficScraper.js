const axios = require('axios');
const cheerio = require('cheerio');
const { TrafficData } = require('../models/TrafficData');

// Sample locations for Bangalore
const LOCATIONS = [
  { name: 'MG Road', coordinates: { lat: 12.9716, lng: 77.5946 } },
  { name: 'Indiranagar', coordinates: { lat: 12.9784, lng: 77.6408 } },
  { name: 'Koramangala', coordinates: { lat: 12.9279, lng: 77.6271 } },
  { name: 'Whitefield', coordinates: { lat: 12.9698, lng: 77.7499 } },
  { name: 'Electronic City', coordinates: { lat: 12.8398, lng: 77.6770 } }
];

async function scrapeTrafficData() {
  try {
    // In a real implementation, you would scrape from actual traffic data sources
    // For now, we'll simulate real-time data
    const trafficData = LOCATIONS.map(location => {
      const vehicles = Math.floor(Math.random() * 500) + 100;
      const speed = Math.floor(Math.random() * 40) + 20;
      const congestion = vehicles > 400 ? 'High' : vehicles > 250 ? 'Medium' : 'Low';

      return new TrafficData({
        location,
        vehicles: {
          count: vehicles,
          speed,
          congestion
        }
      });
    });

    // Save to database
    await TrafficData.insertMany(trafficData);
    console.log('Traffic data updated successfully');
  } catch (error) {
    console.error('Error scraping traffic data:', error);
  }
}

// Run scraper every 5 minutes
setInterval(scrapeTrafficData, 5 * 60 * 1000);

// Initial run
scrapeTrafficData();

module.exports = { scrapeTrafficData }; 