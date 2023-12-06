const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    maxcount: {
      type: Number,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    rentperday: {
      type: Number,
      required: true,
    },
    imageurls: [],
    currentBookings: [],
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RoomModel = mongoose.model('rooms', roomSchema);
module.exports = RoomModel;
