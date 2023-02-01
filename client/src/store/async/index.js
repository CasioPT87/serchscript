const requestConfig = require('./config')

const serverRequest =
  config =>
  ({ pathParams, searchParams, formDataProps, data } = {}) => {
    console.log('server request')
    return async (dispatch, getState) => {
      return new Promise(async (res, rej) => {
        console.log(process.env.SERVER_DOMAIN)
        const url = new URL(process.env.SERVER_DOMAIN)
        let body = null
        const headers = {
          Accept: '*/*',
        }

        let pathname = config.path
        if (config.pathParams) {
          config.pathParams.forEach(pathParam => {
            const replacement = pathParams && pathParams[pathParam]
            if (replacement)
              pathname = pathname.replaceAll(`:${pathParam}`, replacement)
          })
        }

        url.pathname = pathname

        if (config.searchParams) {
          config.searchParams.forEach(searchParam => {
            const value = searchParams && searchParams[searchParam]
            if (value) url.searchParams.append(searchParam, value)
          })
        }

        if (config.formDataProps) {
          body = new FormData()
          config.formDataProps.forEach(formDataProp => {
            const value = formDataProps && formDataProps[formDataProp]
            if (value) body.append(formDataProp, value)
          })
        }

        if (data) {
          body = JSON.stringify(data)
        }

        const requestOptions = {
          method: config.method,
          headers,
        }

        if (body) {
          headers['Content-Type'] = 'application/json'
          requestOptions.body = body
        }

        const response = await fetch(url.toString(), requestOptions)

        let responseData

        try {
          const contentType = response.headers.get('content-type')
          if (contentType && contentType.indexOf('application/json') !== -1) {
            responseData = await response.json()
          } else {
            responseData = await response.text()
          }
        } catch (e) {
          rej(e.message)
        }

        if (response.ok && response.status < 300) {
          res(responseData)
        } else {
          rej(responseData)
        }
      })
        .then(async data => {
          if (config.successDispatch && Array.isArray(config.successDispatch)) {
            const dispatches = createDispatchFns({
              fns: config.successDispatch,
              payload: data,
              dispatch,
            })
            await Promise.all(dispatches)
          }
          return data
        })
        .catch(async error => {
          if (config.failDispatch && Array.isArray(config.failDispatch)) {
            const dispatches = createDispatchFns({
              fns: config.failDispatch,
              payload: error,
              dispatch,
            })
            await Promise.all(dispatches)
          }
        })
    }
  }

const createDispatchFns = ({ fns, payload, dispatch }) => {
  return fns.map(eachDispatchFn => {
    return dispatch(eachDispatchFn(payload))
  })
}

const uploadImages =
  conf =>
  ({ entityMap }) =>
  async (dispatch, getState) => {
    const { method, path } = conf

    const uploadRequests = Object.values(entityMap).map(async entity => {
      const {
        data: { file, id },
      } = entity

      if (!file || typeof file === 'string') return Promise.resolve(entity)
      const body = new FormData()
      body.append('name', id)
      body.append('file', file, id)

      const response = await fetch(path, {
        method,
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, gr',
        },
        body,
      })

      if (!response.ok) throw new Error('problem uploading image')
      return response.json()
    })

    return Promise.all(uploadRequests)
  }

const createDigestedArticleEntityMap = ({ uploadResponses, content }) => {
  const { entityMapValues } = content
  const _entityMapValues = Object.assign({}, entityMapValues) // creating copy to avoid mutating the original object
  for (let i = 0; i < _entityMapValues.length; i++) {
    const filename = uploadResponses[i].filename || uploadResponses[i].data.file
    const entity = _entityMapValues[i]
    entity.data.file = filename
  }
  return _entityMapValues
}

const createDigestedContent = ({ digestedEntities, content }) => {
  return JSON.stringify({ ...content, entityMap: digestedEntities })
}

const processArticle = conf => uploadedImagesData => payload => {
  const {
    data: { content },
  } = payload
  const digestedEntities = createDigestedArticleEntityMap({
    uploadResponses: uploadedImagesData,
    content,
  })
  const digestedContent = createDigestedContent({ digestedEntities, content })
  payload.data.content = digestedContent
  return serverRequest(conf)(payload)
}

const serverRequests = {
  article: {
    create: processArticle(requestConfig.articles.create),
    update: processArticle(requestConfig.articles.update),
    show: serverRequest(requestConfig.articles.show),
    list: serverRequest(requestConfig.articles.list),
  },
  comment: {
    create: serverRequest(requestConfig.comment.create),
  },
  image: {
    upload: uploadImages(requestConfig.image.upload),
  },
  auth: {
    login: serverRequest(requestConfig.auth.login),
    logout: serverRequest(requestConfig.auth.logout),
  },
}

module.exports = serverRequests
