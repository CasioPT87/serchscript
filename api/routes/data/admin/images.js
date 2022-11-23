var express = require('express')
const path = require('path')
const busboy = require('busboy')
var router = express.Router()

// const upload = multer({ dest: path.resolve(__dirname, "/public") })

// save photo
router.post('/image', function (req, res) {
    console.log('holaaaaaaa')
  const bb = busboy({ headers: req.headers })

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info
    const saveTo = `/public/${name}`
    file.pipe(fs.createWriteStream(saveTo))
  })
  bb.on('close', () => {
    res.writeHead(200, { Connection: 'close' })
    res.end(`That's all folks!`)
  })
  req.pipe(bb)
})

module.exports = router
