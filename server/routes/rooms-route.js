const express = require('express');
const router = express.Router();

const Room = require('../models/room');

router.get('/get-all-rooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.json(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get('/get-room-by-id', async (req, res) => {
  try {
    const { roomId } = req.query;

    if (!roomId || typeof roomId !== 'string') {
      throw 'Please provide valid room id';
    }

    const description = await Room.findById(roomId);
    return res.json(description);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post('/create-room', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.send('Room saved successfully!');
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
