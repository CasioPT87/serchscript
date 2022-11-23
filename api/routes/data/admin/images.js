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

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info
    console.log({ name, file, info })
    const format = getFormat(mimeType)
    const saveTo = process.cwd() + `/public/${name}${format}`
    file.pipe(createWriteStream(saveTo))
  })
  bb.on('close', () => {
    res.writeHead(200, { Connection: 'close' })
    res.end(`That's all folks!`)
  })
  req.pipe(bb)
})

module.exports = router
