const React = require('react')

const { convertToHTML } = require('draft-convert')
const { convertFromRaw } = require('draft-js')

const getFileExtension = filename => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

const rawContentToHtml = rawContent => {
  const cooked = convertFromRaw(rawContent)
  const preHtml = convertToHTML({
    entityToHTML: (entity, originalText) => {
      if (entity.type === 'LINK') {
        return <a href={entity.data.url}>{originalText}</a>
      }
      return originalText
    },
  })(cooked)
  return preHtml
    .replace(/<figure>/g, '<img src="')
    .replace(/<\/figure>/g, '" >')
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
