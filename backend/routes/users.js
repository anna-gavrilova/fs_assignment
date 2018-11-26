const express = require("express");
//const StudentModel = require('../models/student');

const router = express.Router();
router.useMethod;

router.get('/meow', (req, res, next) => {

  console.log('POST:MEOW');
  res.send({hello:'world'});
  

});


module.exports = router;
