const {
  addArticles,
  addArticle,
  setLogged,
  addArticleComment,
} = require('../actions')

// articles
const fetchArticles =
  ({ page, limit }) =>
  async (dispatch, getState) => {
    return new Promise(async(resolve, reject) => {
      const response = await fetch(`/data/articles?page=${page}&limit=${limit}`)
      if (response.ok) {
        const responseData = await response.json()
        await dispatch(addArticles(responseData))
        resolve(responseData)
      } else {
        reject()
      }
    }).then(data => {
      return { message: 'articles fetched' }
    }).catch(e => {
      return { message: 'problem fetching articles' }
    })
  }

// article
const fetchArticle =
  titleId =>
  async (dispatch, getState) => {
    return new Promise(async(resolve, reject) => {
      const response = await fetch(`/data/articles/${titleId}`)
      if (response.ok) {
        const responseData = await response.json()
        await dispatch(addArticle(responseData))
        resolve(responseData)
      } else {
        reject()
      }
    }).then(data => {
      return { message: 'articles fetched' }
    }).catch(e => {
      return { message: 'problem fetching articles' }
    })
  }

const createUpdateArticle = method => ({ id, title, description, content, hidden = false }) =>
  async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const digestedEntities = await uploadImages(content)
      let path = '/data/admin/articles' // for POST
      if (method === 'PUT') path = `/data/admin/articles/${id}`
      const response = await fetch(path, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Connection: 'keep-alive',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          content: JSON.stringify({ ...content, entityMap: digestedEntities }),
          hidden,
        }),
      })
      if (response.ok) {
        const responseData = await response.json()
        await dispatch(addArticle(responseData))
        resolve(responseData)
      } else {
        reject(responseData)
      }
    }).then(data => ({ message: data.message }))
    .catch(e => ({ message: e.message }))
  }

//images
const uploadImages = async ({ entityMap }) => {
  const entityMapValues = Object.values(entityMap)
  const uploadRequests = entityMapValues.map(async (entity, index) => {
    const {
      data: { file, id },
    } = entity
    if (!file || typeof file === 'string') return Promise.resolve(entity)
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

    if (!response.ok) throw new Error('problem uploading image')
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

// auth
const login =
  ({ name, password }) =>
  async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const response = await fetch('/data/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Connection: 'keep-alive',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, password }),
      })

      if (response.ok) {
        await dispatch(setLogged(true))
        resolve()
      } else {
        reject()
      }
    }).catch(() => {
      dispatch(setLogged(false))
    })
  }

const logout = () => async (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch('/data/auth/logout')
    if (response.ok && response.status < 300) {
      dispatch(setLogged(false))
    } else {
      return { message: 'problem logging out'}
    }
  })
}

// comment
const createComment =
  ({ articleId, content }) =>
  async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(`/data/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Connection: 'keep-alive',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          articleId,
          content,
        }),
      })

      if (response.ok) {
        const responseData = await response.json()
        await dispatch(addArticleComment(responseData))
        resolve()
      } else {
        reject()
      }
    }).then(() => ({ message: 'Comment created successfully'}))
    .catch(() => ({ message: 'Create comment failed'}))
  }

module.exports = {
  article: {
    create: createUpdateArticle('POST'),
    update: createUpdateArticle('PUT'),
    show: fetchArticle,
    list: fetchArticles
  },
  comment: {
    create: createComment
  },
  auth: {
    login,
    logout
  }
}
