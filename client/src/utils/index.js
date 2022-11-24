const { convertToHTML } = require('draft-convert')
const { convertFromRaw } = require('draft-js')

const getFileExtension = filename => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

const rawContentToHtml = rawContent => {
  const cooked = convertFromRaw(rawContent)
  const preHtml = convertToHTML(cooked)
  return preHtml
    .replaceAll('<figure>', '<img src="')
    .replaceAll('</figure>', '" >')
}

const getCookie = () =>
  document.cookie
    .split('; ')
    .filter(row => row.startsWith('serchScriptSession='))
    .map(c => c.split('=')[1])[0]

module.exports = {
  getFileExtension,
  rawContentToHtml,
  getCookie,
}
