const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
  try {
    const userAlreadyExist = await User.findOne({ email: req.body.email });
    if (userAlreadyExist) throw 'User already exists!';
    if (req.body?.password !== req.body?.confirm_password) {
      throw 'Passwords do not match!';
    }

    const newUser = new User({ ...req.body, isAdmin: false });
    await newUser.save();
    res.send('Successfully registered!');
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    if (!user) throw 'Credentials incorrect!';

    const safeUser = {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      isAdmin: user.isAdmin,
      _id: user._id,
    };

    res.send(safeUser);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get('/get-all-users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
