const express = require('express');
const router = express.Router();
const { TrafficData, Incident, Signal } = require('../models/TrafficData');

// Get all traffic data
router.get('/traffic', async (req, res) => {
  try {
    const trafficData = await TrafficData.find()
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(trafficData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all incidents
router.get('/incidents', async (req, res) => {
  try {
    const incidents = await Incident.find()
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all signals
router.get('/signals', async (req, res) => {
  try {
    const signals = await Signal.find()
      .sort({ timestamp: -1 });
    res.json(signals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new traffic data
router.post('/traffic', async (req, res) => {
  const trafficData = new TrafficData(req.body);
  try {
    const newTrafficData = await trafficData.save();
    res.status(201).json(newTrafficData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add new incident
router.post('/incidents', async (req, res) => {
  const incident = new Incident(req.body);
  try {
    const newIncident = await incident.save();
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update signal status
router.put('/signals/:id', async (req, res) => {
  try {
    const signal = await Signal.findById(req.params.id);
    if (signal) {
      Object.assign(signal, req.body);
      const updatedSignal = await signal.save();
      res.json(updatedSignal);
    } else {
      res.status(404).json({ message: 'Signal not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 