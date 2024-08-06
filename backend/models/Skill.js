const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  masteryLevel: {
    type: Number,
    required: true,
    min: 1, // Ensure mastery level is at least 1
    max: 5  // Assuming a 5-star rating system
  }
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
