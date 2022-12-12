var express = require('express')
const { createWriteStream } = require('fs')
const busboy = require('busboy')
var router = express.Router()

// save photo
router.post('/', function (req, res) {
  const bb = busboy({ headers: req.headers })

  let filename

  bb.on('file', (name, file, info) => {
    const { filename: _filename, encoding, mimeType } = info
    filename = _filename
    const saveTo = process.cwd() + `/public/${filename}`
    file.pipe(createWriteStream(saveTo))
  })
  bb.on('close', () => {
    res.status(200).json({ filename: filename })
  })
  req.pipe(bb)
})

module.exports = router
