const express = require('express');
const { addJob, deleteJob, updateJob, fetchJobsbyDate } = require('../controllers/jobController');
const { jobValidation } = require('../helpers/validations');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, fetchJobsbyDate);

router.post('/', protect, jobValidation, addJob);

router.put('/:id', protect, updateJob);

router.delete('/:id', protect, deleteJob);

module.exports = router;
