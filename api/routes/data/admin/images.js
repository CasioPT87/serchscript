var express = require("express");
const path = require("path");
// const multer = require('multer')
const db = require("../../../../db/actions");
var router = express.Router();

// const upload = multer({ dest: path.resolve(__dirname, "/public") })

// save photo
// router.post('/image', upload.single('uploaded_file'), function (req, res) {
//   // req.file is the name of your file in the form above, here 'uploaded_file'
//   // req.body will hold the text fields, if there were any
//   console.log(req.file, req.body)
// });

module.exports = router;
