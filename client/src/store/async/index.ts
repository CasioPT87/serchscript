const requestConfig = require('./config')
import type { RequestParams } from '../types/index'

const serverRequest =
  (config: any) =>
  ({ pathParams, searchParams, formDataProps, data }: RequestParams = {}) => {
    return async (dispatch: any) => {
      return new Promise(async (res, rej) => {
        const url = new URL(process.env.SERVER_DOMAIN)
        let body: any = null
        const headers: any = {
          Accept: '*/*',
        }

        let pathname = config.path
        if (config.pathParams) {
          config.pathParams.forEach((pathParam: any) => {
            const replacement = pathParams && pathParams[pathParam]
            if (replacement)
              pathname = pathname.replace(`:${pathParam}`, replacement)
          })
        }

        url.pathname = pathname

        if (config.searchParams) {
          config.searchParams.forEach((searchParam: any) => {
            const value = searchParams && searchParams[searchParam]
            if (value) url.searchParams.append(searchParam, value)
          })
        }

        if (config.formDataProps) {
          body = new FormData()
          config.formDataProps.forEach((formDataProp: any) => {
            const value = formDataProps && formDataProps[formDataProp]
            if (value) body.append(formDataProp, value)
          })
        }

        if (data) {
          body = JSON.stringify(data)
        }

        const requestOptions: any = {
          method: config.method,
          headers,
        }

        if (body) {
          headers['Content-Type'] = 'application/json'
          requestOptions.body = body
        }

        const response = await fetch(url.toString(), requestOptions)

        responseDealer({ response, res, rej })
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
            await Promise.all(dispatches).catch(e =>
              console.log('error sending message')
            )
          }
        })
    }
  }

const uploadImages =
  (config: any) =>
  ({ entityMap }: any) =>
  async (dispatch: any) => {
    const { method, path } = config

    const uploadRequests = Object.values(entityMap).map(async (entity: any) => {
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

      return new Promise(async (res, rej) => {
        await responseDealer({ response, res, rej })
      })
        .then(data => data)
        .catch(async error => {
          if (config.failDispatch && Array.isArray(config.failDispatch)) {
            const dispatches = createDispatchFns({
              fns: config.failDispatch,
              payload: error,
              dispatch,
            })
            await Promise.all(dispatches).catch(e =>
              console.log('error sending message')
            )
          }
        })
    })

    return Promise.all(uploadRequests)
  }

const createDispatchFns = ({ fns, payload, dispatch }: any) => {
  return fns.map((eachDispatchFn: any) => {
    return dispatch(eachDispatchFn(payload))
  })
}

const responseDealer = async ({ response, res, rej }: any) => {
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
}

const createDigestedArticleEntityMap = ({ uploadResponses, content }: any) => {
  const { entityMap } = content
  const entityMapValues = Object.values(entityMap)
  const _entityMapValues = [...entityMapValues]

  for (let i = 0; i < _entityMapValues.length; i++) {
    const filename = uploadResponses[i].filename || uploadResponses[i].data.file
    const entity: any = _entityMapValues[i]
    entity.data.file = filename
  }

  return _entityMapValues
}

const createDigestedContent = ({ digestedEntities, content }: any) => {
  return JSON.stringify({ ...content, entityMap: digestedEntities })
}

const processArticle =
  (conf: any) => (uploadedImagesData: any) => (payload: any) => {
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
