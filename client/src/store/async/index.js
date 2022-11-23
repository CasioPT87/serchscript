const fetch = require('node-fetch')
const { addArticles, addArticle, addArticlesArticle } = require('../actions')

const fetchArticles = () => async (dispatch, getState) => {
  const response = await fetch('http://localhost:8880/data/articles')
  const responseData = await response.json()
  dispatch(addArticles(responseData))
}

const fetchArticle = id => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:8880/data/articles/${id}`)
  const responseData = await response.json()
  dispatch(addArticle(responseData))
}

const uploadImages = async ({ entityMap }) => {
  const entityMapValues = Object.values(entityMap)
  const uploadRequests = entityMapValues.map(async (entity, index) => {
    const {
      data: { file, id },
    } = entity
    const body = new FormData()
    body.append('name', id)
    body.append('file', file, id)

    const response = await fetch('/data/admin/images', {
      method: 'POST',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, gr',
      },
      body,
    })
    return response.json()
  })

  const uploadResponses = await Promise.all(uploadRequests)
  for (let i = 0; i < entityMapValues.length; i++) {
    const entity = entityMapValues[i]
    entity.data.file = uploadResponses[i].filename
  }

  return Object.assign({}, entityMapValues)
}

const createArticle =
  ({ title, description, content, hidden = false }) =>
  async (dispatch, getState) => {
    const digestedEntities = await uploadImages(content)

    const response = await fetch('http://localhost:8880/data/admin/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
        Accept: '*/*',
      },
      body: JSON.stringify({
        title,
        description,
        content: JSON.stringify({ ...content, entityMap: digestedEntities }),
        hidden,
      }),
    })
    const responseData = await response.json()
    dispatch(addArticle(responseData))
    dispatch(addArticlesArticle(responseData))
  }

module.exports = {
  fetchArticles,
  fetchArticle,
  createArticle,
  uploadImages,
}
