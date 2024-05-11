const express = require('express');
const {getCourses, createCourse} = require('../controllers/course');
const {authorize, protect} = require('../middleware/auth');
const { create } = require('../models/Course');

const router = express.Router();

router.get('/', getCourses);
router.post('/', createCourse);

module.exports = router;