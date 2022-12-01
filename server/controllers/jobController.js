const { validationResult } = require('express-validator');
const { populate } = require('../models/jobModel');
const Job = require('../models/jobModel');
const User = require('../models/userModel');

//Fetch jobs by Date
const fetchJobsbyDate = async (req, res) => {
  const { _id, isAdmin } = req.user;
  const date = req.query.date;

  try {
    if (isAdmin) {
      const jobs = await Job.find({ admin: _id }).find({ date }).populate('barber', '-password');
      res.status(200).json(jobs);
    } else {
      const jobs = await Job.find({ barber: _id }).find({ date });
      res.status(200).json(jobs);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

//Add New Job
const addJob = async (req, res) => {
  const { isAdmin, _id: admin } = req.user;
  const { barber, name, address, phone, service, to, from, date, price } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (isAdmin) {
      const userId = await User.findOne({ 'username': barber }).select('_id)');
      const job = await Job.create({
        barber: userId,
        admin,
        name,
        address,
        phone,
        service,
        date,
        to,
        from,
        price,
      });
      const fullJob = await Job.findOne({ _id: job._id }).populate('barber', '-password');
      res.status(201).json(fullJob);
    } else {
      res.status(401).json('Unauthorized Request');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

//Delete Job
const deleteJob = async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.user;
  try {
    if (isAdmin) {
      await Job.findByIdAndDelete(id);
      res.status(200).json(id);
    } else {
      res.status(401).json('Unauthorized Request');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

//Update Job
const updateJob = async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.user;
  const { barber, name, address, phone, service, date, to, from, price } = req.body;

  try {
    if (isAdmin) {
      const userId = await User.findOne({ 'username': barber }).select('_id');
      const newJob = {
        barber: userId,
        name,
        address,
        phone,
        service,
        date,
        to,
        from,
        price,
      };
      const job = await Job.findByIdAndUpdate(id, newJob, { new: true }).populate(
        'barber',
        '-password',
      );
      res.status(200).json(job);
    } else {
      res.status(401).json('Unauthorized Request');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

module.exports = { addJob, deleteJob, updateJob, fetchJobsbyDate };
