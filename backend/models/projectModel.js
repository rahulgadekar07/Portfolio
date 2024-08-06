const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: false },  // Array of strings for technologies
  link: { type: String, required: false },  // Link as a string
  image: { type: String, required: true },
});

module.exports = mongoose.model('Project', ProjectSchema);
