const express = require('express');
const {getCourses, createCourse, getCourse, updateCourse, deleteCourse} = require('../controllers/course');
const {authorize, protect} = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect,authorize("admin","user"),getCourses).post(protect,authorize("admin"),createCourse);
router.route('/:id').get(protect,authorize("admin","user"),getCourse).put(protect,authorize("admin"),updateCourse).delete(protect,authorize("admin"),deleteCourse);

module.exports = router;