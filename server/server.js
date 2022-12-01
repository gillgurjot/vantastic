const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({ origin: process.env.URL }));
app.use(cors());
connectDb();

const port = process.env.PORT || 5000;

app.get('/', function (req, res) {
  res.status(200).send('Server is Up');
});

//Available Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/job', jobRoutes);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
