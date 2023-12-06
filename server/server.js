require('dotenv').config();
require('./utils/db');
const express = require('express');
const bodyParser = require('body-parser');
const roomsRoute = require('./routes/rooms-route');
const authRoute = require('./routes/auth');
const bookingRoute = require('./routes/booking-route');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/rooms', roomsRoute);
app.use('/api/auth', authRoute);
app.use('/api/bookings', bookingRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
