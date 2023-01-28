const https = require("https");
const JSONbig = require('json-bigint');
const axios = require('axios')
const Stream = require('stream')
const busboy = require('busboy')
// const Writable = require('node:stream').Writable

fs = require('fs')

const TOKEN = 'sl.BXtLNS4-3BZ44VHNJd_8KFyCa9_iBanl1EpvFNNqK2P2R17Fa4XD7W1zw_xsH9_0p7EgjO2DlNR1ubiCWjcVG-dnQV40PzkliiAQPqbNVHwmydXcJ8hlBLNt9OduYR7wJrwFzrwO'

const uploadDropbox = async (req, res, next) => {
    const bb = busboy({ headers: req.headers })
    const tunnel = new Stream.PassThrough()

    const openSessionResponse = await axios({
        method: 'post',
        url: 'https://content.dropboxapi.com/2/files/upload_session/start',
        headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Dropbox-API-Arg': JSON.stringify({
                'close': false
            }),
            'Content-Type': 'application/octet-stream',
        }
    });

    console.log({ openSessionResponse: openSessionResponse.data })

    const sessionId = openSessionResponse.data.session_id

    bb.on('file', (name, file, info) => {
        const { filename: _filename, encoding, mimeType } = info
        const filename = _filename
        file.pipe(tunnel)
    })

    let offset = BigInt(0);

    tunnel.on("data", (chunk) => {
        console.log(offset);
        console.log({ sessionId })
        tunnel.pause();
        const reqAppend = https.request(`https://content.dropboxapi.com/2/files/upload_session/append_v2`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Dropbox-API-Arg': JSONbig.stringify({
                    'cursor': {
                        'session_id': sessionId,
                        'offset': offset
                    },
                    'close': false
                }),
                'Content-Type': 'application/octet-stream',
            }
        }, (res) => {
            res.on('data', function(data){
                console.log({ data: data.toString() })
            });
            tunnel.resume();
        });

        reqAppend.write(chunk);
        reqAppend.end();

        offset += BigInt(chunk.length);
    });

    tunnel.on('end', () => {
        console.log('ended!!!', offset)
        const reqFinish = https.request(`https://content.dropboxapi.com/2/files/upload_session/finish`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Dropbox-API-Arg': JSONbig.stringify({
                    'cursor': {
                        'session_id': sessionId,
                        'offset': offset
                    },
                    "commit": {
                        "path": "./leches2.jpg",
                        "mode": "add",
                        "autorename": true,
                        "mute": false,
                        "strict_conflict": false
                    }
                }),
                'Content-Type': 'application/octet-stream',
            }
        }, (res) => {
            console.log('upload session finish')
            console.log({ res: res.res })
            console.log("statusCode: ", res.statusCode);
        });

        reqFinish.end();
    });

    req.pipe(bb)



    // const reqAppend = https.request(`https://content.dropboxapi.com/2/files/upload_session/append_v2`, {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${TOKEN}`,
    //             'Dropbox-API-Arg': JSONbig.stringify({
    //                 'cursor': {
    //                     'session_id': sessionId,
    //                     'offset': offset
    //                 },
    //                 'close': false
    //             }),
    //             'Content-Type': 'application/octet-stream',
    //         }
    //     }, (algo) => {
    //         console.log({ algo })
    //     });


    // const dpResponse = await request(`https://content.dropboxapi.com/2/files/upload_session/start`, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${TOKEN}`,
    //         'Dropbox-API-Arg': JSON.stringify({
    //             'close': false
    //         }),
    //         'Content-Type': 'application/octet-stream',
    //     }
    // }, (res) => {
    //     console.log(2)
    //     console.log({ res })
    //     res.on('data', (d) => {
    //         console.log({ d })
    //         const json = JSON.parse(d.toString('utf8'));
    //         const session_id = json.session_id
    //         let offset = BigInt(0);

    //         const stream = fs.createReadStream(req);
    //         stream.on('data', (chunk) => {
    //             console.log(offset);
    //             stream.pause();
    //             const reqAppend = https.request(`https://content.dropboxapi.com/2/files/upload_session/append_v2`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Authorization': `Bearer ${TOKEN}`,
    //                     'Dropbox-API-Arg': JSONbig.stringify({
    //                         'cursor': {
    //                             'session_id': session_id,
    //                             'offset': offset
    //                         },
    //                         'close': false
    //                     }),
    //                     'Content-Type': 'application/octet-stream',
    //                 }
    //             }, (res) => {
    //                 stream.resume();
    //             });

    //             reqAppend.write(chunk);
    //             reqAppend.end();

    //             offset += BigInt(chunk.length);
    //         });

    //         stream.on('end', () => {
    //             const reqFinish = https.request(`https://content.dropboxapi.com/2/files/upload_session/finish`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Authorization': `Bearer ${TOKEN}`,
    //                     'Dropbox-API-Arg': JSON.stringify({
    //                         'cursor': {
    //                             'session_id': session_id,
    //                             'offset': offset
    //                         },
    //                         "commit": {
    //                             "path": "/Upload/test-large.txt",
    //                             "mode": "add",
    //                             "autorename": true,
    //                             "mute": false,
    //                             "strict_conflict": false
    //                         }
    //                     }),
    //                     'Content-Type': 'application/octet-stream',
    //                 }
    //             }, (res) => {
    //                 console.log('upload session finish')
    //                 console.log("statusCode: ", res.statusCode);
    //             });

    //             reqFinish.end();
    //         });
    //     });
    // });

    // console.log({ dpResponse })

    // dropboxRequest.on('error', e => {
    //     console.log(e)
    // })
}

module.exports = uploadDropbox