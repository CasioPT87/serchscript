const fetch = require('node-fetch')
const {
  addArticles,
  addArticle,
  addArticlesArticle,
  updateArticlesArticle,
  setLogged,
  addArticleComment,
} = require('../actions')

const fetchArticles = () => async (dispatch, getState) => {
  const response = await fetch(`/data/articles`)
  const responseData = await response.json()
  dispatch(addArticles(responseData))
}

const fetchArticle = titleId => async (dispatch, getState) => {
  const response = await fetch(`/data/articles/${titleId}`)
  const responseData = await response.json()
  dispatch(addArticle(responseData))
}

const uploadImages = async ({ entityMap }) => {
  const entityMapValues = Object.values(entityMap)
  const uploadRequests = entityMapValues.map(async (entity, index) => {
    const {
      data: { file, id },
    } = entity
    if (file && typeof file === 'string') return Promise.resolve(entity)
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
    const filename = uploadResponses[i].filename || uploadResponses[i].data.file
    const entity = entityMapValues[i]
    entity.data.file = filename
  }

  return Object.assign({}, entityMapValues)
}

const createArticle =
  ({ title, description, content, hidden = false }) =>
  async (dispatch, getState) => {
    const digestedEntities = await uploadImages(content)

    const response = await fetch('/data/admin/articles', {
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
    if (response.ok) {
      dispatch(addArticle(responseData))
      dispatch(addArticlesArticle(responseData))
    }

    return { message: responseData.message }
  }

const updateArticle =
  ({ id, title, description, content, hidden = false }) =>
  async (dispatch, getState) => {
    const digestedEntities = await uploadImages(content)

    const response = await fetch(`/data/admin/articles/${id}`, {
      method: 'PUT',
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

    if (response.ok) {
      dispatch(addArticle(responseData))
      dispatch(updateArticlesArticle(responseData))
    }

    return { message: responseData.message }
  }

const login =
  ({ name, password }) =>
  async (dispatch, getState) => {
    try {
      let response = await fetch('/data/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Connection: 'keep-alive',
          Accept: '*/*',
        },
        body: JSON.stringify({ name, password }),
      })

      if (response.ok && response.status < 300) {
        dispatch(setLogged(true))
      } else {
        dispatch(setLogged(false))
      }
      return response.json()
    } catch (e) {
      await dispatch(setLogged(false))
      throw e
    }
  }

const logout = () => async (dispatch, getState) => {
  try {
    let response = await fetch('/data/auth/logout')

    if (response.ok && response.status < 300) {
      dispatch(setLogged(false))
    }

    return response.json()
  } catch (e) {
    console.log('Error loging out')
  }
}

const createComment =
  ({ articleId, content }) =>
  async (dispatch, getState) => {
    const response = await fetch(`/data/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
        Accept: '*/*',
      },
      body: JSON.stringify({
        articleId,
        content,
      }),
    })

    const responseData = await response.json()

    if (response.ok) {
      dispatch(addArticleComment(responseData))
      return { message: 'comment created succesfully' }
    }

    return { message: 'problem creating comment' }
  }

module.exports = {
  fetchArticles,
  fetchArticle,
  createArticle,
  uploadImages,
  updateArticle,
  login,
  logout,
  createComment,
}
