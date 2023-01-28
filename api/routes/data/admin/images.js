const express = require('express')
const { createWriteStream } = require('fs')
const busboy = require('busboy')
const router = express.Router()
const uploadDropbox = require('./utils/dropboxManager')

// save photo
router.post('/', async function (req, res, next) {
  await uploadDropbox(req, res, next)
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

  //handling errors
  bb.on('error', e => {
    next(e)
  })
  req.on('aborted', next)
  //

  req.pipe(bb)
})

module.exports = router
