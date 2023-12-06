const router = require('express').Router();
const v4 = require('uuid').v4;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const RoomModel = require('../models/room');
const BookingModel = require('../models/booking');

router.post('/book-room', async (req, res) => {
  const {
    roomName,
    roomId,
    userId,
    fromDate,
    toDate,
    totalDays,
    totalAmount,
    token,
  } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        customer: customer.id,
        currency: 'usd',
        receipt_email: token.email,
      },
      {
        idempotencyKey: v4(),
      }
    );

    if (!payment) throw 'Payment unsuccessful';

    const newBooking = new BookingModel({
      room: roomName,
      roomId,
      userId,
      fromDate,
      toDate,
      totalDays,
      totalAmount,
      transactionId: '1234556',
    });

    const booking = await newBooking.save();

    const room = await RoomModel.findOne({ _id: roomId });
    room.currentBookings.push({
      bookingId: booking?._id,
      fromDate,
      toDate,
      userId,
      status: booking?.status,
    });
    await room.save();

    res.send('Room booking successful!');
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/get-all-bookings', async (req, res) => {
  const { userId } = req.body;

  try {
    const bookings = await BookingModel.find({ userId });
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/get-all-bookings', async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/cancel-booking', async (req, res) => {
  const { bookingId, roomId } = req.body;

  try {
    const booking = await BookingModel.findOne({ _id: bookingId });
    booking.status = 'cancelled';

    const room = await RoomModel.findOne({ _id: roomId });
    const roomBookings = room.currentBookings;

    const temp = roomBookings.filter(
      (pred) => pred.bookingId.toString() !== bookingId
    );
    room.currentBookings = temp;

    await room.save();
    await booking.save();

    res.send('Booking cancelled successfully!');
  } catch (error) {
    console.log('🚀 ~ file: booking-route.js:99 ~ router.post ~ error:', error)
    res.status(400).json({ error });
  }
});

module.exports = router;
