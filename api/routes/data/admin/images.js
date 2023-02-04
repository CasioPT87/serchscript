const express = require('express')
const { createWriteStream, createReadStream } = require('fs')
const busboy = require('busboy')
const router = express.Router()
const { Storage } = require('megajs')
const path = require('path')
const { addAbortSignal } = require('stream')

class BackupManager {
  constructor(file, filename, onError, onSuccess, abortSignal) {
    this.file = file
    this.filename = filename
    this.onError = onError
    this.onSuccess = onSuccess
    this.abortSignal = abortSignal
  }

  upload = imagePath => async () => {
    console.log('backup uoload')

    const saveStream = createReadStream(imagePath)

    const storage = await new Storage({
      email: process.env.META_USERNAME,
      password: process.env.META_PASS,
    }).ready

    const uploadStream = storage.upload({
      name: this.filename,
      allowUploadBuffering: true,
    })

    uploadStream.on('finish', this.onSuccess)

    uploadStream.on('error', this.onError)

    const stream = addAbortSignal(this.abortSignal, uploadStream)

    saveStream.pipe(stream)
  }
}

class ImageManager {
  constructor(file, filename, onError, onSuccess, backupService, abortSignal) {
    this.file = file
    this.storagePathBase = path.join(process.cwd(), `/public/${filename}`)
    this.onError = onError
    this.abortSignal = abortSignal

    this.backupService = new backupService(
      file,
      filename,
      onError,
      onSuccess,
      abortSignal
    )
  }

  start() {
    this.upload(this.backupService.upload)
  }

  upload = () => {
    const saveStream = createWriteStream(this.storagePathBase)

    saveStream.on('error', this.onError)
    saveStream.on('finish', this.backupService.upload(this.storagePathBase))

    const abortableStream = addAbortSignal(this.abortSignal, saveStream)

    this.file.pipe(abortableStream)
  }
}

// save photo
router.post('/', async function (req, res, next) {
  const bb = busboy({ headers: req.headers })

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info

    const abortController = new AbortController()

    const onError = () => {
      res.status(409).send(`Error: Image ${filename} upload failed`)
    }

    const onSuccess = () => {
      res.status(200).json({ filename })
    }

    new ImageManager(
      file,
      filename,
      onError,
      onSuccess,
      BackupManager,
      abortController.signal
    ).upload()

    file.on('error', e => {
      abortController.abort()
      onError()
    })
  })

  //handling errors
  bb.on('error', e => {
    abort()
    res.status(409).send(`Error: Image upload failed`)
  })

  req.pipe(bb)
})

module.exports = router
