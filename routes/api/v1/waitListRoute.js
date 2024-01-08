const Router = require('express').Router();
const WaitList = require('../../../model/WaitList');
Router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  const user = await WaitList.findOne({ email: email }).exec();
  if (user) {
  return res.status(409).json({ message: 'User already exists' });
  }
  const newUser = new WaitList({ email });
  const user = await newUser.save();
  return res.status(201).json({ message: 'User added to waitlist' });
});
module.exports = Router;
