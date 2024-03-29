const React = require('react')

import { convertToHTML } from 'draft-convert'
import { convertFromRaw, RawDraftContentState } from 'draft-js'

const getFileExtension = (filename: string) => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

const rawContentToHtml = (rawContent: RawDraftContentState) => {
  const cooked = convertFromRaw(rawContent)
  return convertToHTML({
    entityToHTML: (entity, originalText) => {
      if (entity.type === 'LINK') {
        return <a href={entity.data.url}>{originalText}</a>
      }
      if (entity.type === 'IMAGE') {
        return <img src={`/${entity?.data?.file}`} alt="article image" />
      }
      return originalText
    },
    blockToHTML: block => {
      if (block.type === 'unstyled' && block.text === '') {
        return <br />
      }
    },
  })(cooked)
    .replace(/<figure>/g, '')
    .replace(/<\/figure>/g, '')
}

const getCookie = (): string =>
  document.cookie
    .split('; ')
    .filter(row => row.startsWith('serchScriptSession='))
    .map(c => c.split('=')[1])[0]

module.exports = {
  getFileExtension,
  rawContentToHtml,
  getCookie,
}
