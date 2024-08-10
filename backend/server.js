//server.js (path:D:\Soft Skills\New folder\backend\server.js)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const projectRoutes = require('./routes/projectRoutes');
const skillsRoutes =require('./routes/skillsRoutes');
const contactRoutes = require('./routes/contactRoutes');
const certificationRoutes = require('./routes/certificationRoutes');

const app = express();
const port = process.env.PORT || 5000;

connectDB();
app.get('/', (req, res) => {
  res.send('Hello World from Portfolio backend!');
});
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use('/skills', express.static('skills'));
app.use('/public', express.static('public'));
app.use('/certifications', express.static('certifications'));



app.use('/api', projectRoutes);
app.use('/api', skillsRoutes);
app.use('/api', contactRoutes);
app.use('/api/certifications', certificationRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
