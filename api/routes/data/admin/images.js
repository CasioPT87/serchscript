var express = require('express')
const path = require('path')
const { createWriteStream } = require('fs')
const busboy = require('busboy')
var router = express.Router()

const getFormat = mimeType => {
  switch (mimeType) {
    case 'image/png':
      return '.png'
    case 'image/jpg':
    case 'image/jpeg':
      return '.jpg'
    default:
      return null
  }
}

// save photo
router.post('/', function (req, res) {
  const bb = busboy({ headers: req.headers })

  let filename
  let format

  bb.on('file', (name, file, info) => {
    const { filename: _filename, encoding, mimeType } = info
    filename = _filename
    format = getFormat(mimeType)
    const saveTo = process.cwd() + `/public/${filename}${format}`
    file.pipe(createWriteStream(saveTo))
  })
  bb.on('close', () => {
    res.status(200).json({ filename: filename + format })
  })
  req.pipe(bb)
})

module.exports = router
