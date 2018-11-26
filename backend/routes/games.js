const express = require("express");
//const StudentModel = require('../models/student');

const router = express.Router();


router.get('', (req, res, next) => {

  console.log('GET: Student lists');

  // Add Mongoose query to find all return list of students and return

});

module.exports=router;