const mongoose = require('mongoose');

const trafficDataSchema = new mongoose.Schema({
  location: {
    name: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  vehicles: {
    count: Number,
    speed: Number,
    congestion: {
      type: String,
      enum: ['Low', 'Medium', 'High']
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const incidentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Accident', 'Road Work', 'Signal Failure', 'Other']
  },
  location: {
    name: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High']
  },
  status: {
    type: String,
    enum: ['Active', 'Resolved', 'Pending']
  },
  description: String,
  response: String,
  updates: [{
    time: Date,
    message: String
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const signalSchema = new mongoose.Schema({
  intersection: {
    name: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  status: {
    type: String,
    enum: ['Normal', 'Emergency']
  },
  currentPhase: String,
  nextPhase: String,
  timeRemaining: Number,
  trafficLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High']
  },
  emergency: Boolean,
  phases: [{
    id: Number,
    name: String,
    duration: Number,
    active: Boolean
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  TrafficData: mongoose.model('TrafficData', trafficDataSchema),
  Incident: mongoose.model('Incident', incidentSchema),
  Signal: mongoose.model('Signal', signalSchema)
}; 