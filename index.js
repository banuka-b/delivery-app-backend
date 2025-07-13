const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');


const mailRoutes = require('./routes/mailRoutes');
const otpRoutes = require('./routes/otpRoutes');
const regiRoutes = require('./routes/regiRoutes');
const generateOtp = require('./utils/gene');
const deliveryRoutes = require('./routes/deliveryRoutes')
const admin = require('./routes/adminRoutes')


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/mail', mailRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/regi', regiRoutes);
app.use('/api/deli',deliveryRoutes);
app.use('/api/ad',admin);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3002, () => console.log('Server running on port 3002'));

    // Optional: generate OTP after startup
    console.log('Generated OTP:', generateOtp());
   
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });
