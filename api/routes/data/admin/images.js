const express = require('express')
const { createWriteStream } = require('fs')
const busboy = require('busboy')
const router = express.Router()
const { Storage } = require('megajs')

// save photo
router.post('/', async function (req, res, next) {
  const bb = busboy({ headers: req.headers })

  const storage = await new Storage({
    email: process.env.META_USERNAME,
    password: process.env.META_PASS,
  }).ready

  let filename

  bb.on('file', (name, file, info) => {
    const { filename: _filename, encoding, mimeType } = info
    filename = _filename
    const metaStream = storage.upload({
      name: filename,
      allowUploadBuffering: true,
    })
    file.pipe(metaStream)
  })

  bb.on('close', () => {
    res.status(200).json({ filename: filename })
  })

  //handling errors
  bb.on('error', e => {
    next(e)
  })
  req.on('aborted', next)

  req.pipe(bb)
})

module.exports = router
