const React = require('react')

const { convertToHTML } = require('draft-convert')
const { convertFromRaw } = require('draft-js')

const getFileExtension = filename => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

const rawContentToHtml = rawContent => {
  const cooked = convertFromRaw(rawContent)
  return convertToHTML({
    entityToHTML: (entity, originalText) => {
      if (entity.type === 'LINK') {
        return <a href={entity.data.url}>{originalText}</a>
      }
      if (entity.type === 'IMAGE') {
        console.log({ entity, originalText })
        return <img src={`/images/${entity?.data?.file}`} alt="article image" />
      }
      return originalText
    },
  })(cooked)
    .replace(/<figure>/g, '')
    .replace(/<\/figure>/g, '')
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
