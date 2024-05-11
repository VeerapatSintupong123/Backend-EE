const express = require('express');
const {getCourses, createCourse, getCourse, updateCourse, deleteCourse} = require('../controllers/course');
const {authorize, protect} = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getCourses).post(createCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;