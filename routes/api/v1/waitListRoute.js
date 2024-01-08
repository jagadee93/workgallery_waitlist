const Router = require('express').Router();
const WaitList = require('../../../model/WaitList');
Router.post('/', async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const user = await WaitList.findOne({ email: email }).exec();
    if (user) {
      return res.status(409).json({ message: 'You have already joined' });
    }
    const newUser = new WaitList({ email });
    await newUser.save();
    return res.status(201).json({ message: 'You are added to waitlist' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = Router;
