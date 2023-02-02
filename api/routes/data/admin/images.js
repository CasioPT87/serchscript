const express = require('express')
const { createWriteStream } = require('fs')
const busboy = require('busboy')
const router = express.Router()
const { Storage } = require('megajs')
const path = require('path')

class BackupManager {
  constructor(file, filename, onError) {
    this.file = file
    this.filename = filename
    this.onError = onError
  }

  async upload() {
    const storage = await new Storage({
      email: process.env.META_USERNAME,
      password: process.env.META_PASS,
    }).ready

    const uploadStream = storage.upload({
      name: this.filename,
      allowUploadBuffering: true,
    })

    uploadStream.on('error', () => {
      this.onError()
    })

    this.file.pipe(uploadStream)
  }
}

class ImageManager {
  constructor(file, filename, onError) {
    this.file = file
    this.storagePathBase = path.join(process.cwd(), `/public/${filename}`)
    this.onError = onError
  }

  upload() {
    const writableStream = createWriteStream(this.storagePathBase)

    writableStream.on('error', () => {
      this.onError()
    })

    this.file.pipe(writableStream)
  }
}

const onError = (res, filename = '-unknown file name-') => {
  res.status(409).send(`Error: Image ${filename} upload failed`)
}

// save photo
router.post('/', async function (req, res, next) {
  const bb = busboy({ headers: req.headers })

  let _filename = 'unkown file name'

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info

    _filename = filename

    const _onError = () => onError(res, filename)

    new BackupManager(file, filename, _onError).upload()
    new ImageManager(file, filename, _onError).upload()

    file.on('close', () => {
      res.status(200).json({ filename: _filename })
    })

    file.on('error', e => {
      onError(res, filename)
    })
  })

  //handling errors
  bb.on('error', e => {
    res.status(409).send(`Error: Image upload failed`)
  })
  req.on('aborted', () => onError(res))

  req.pipe(bb)
})

module.exports = router
