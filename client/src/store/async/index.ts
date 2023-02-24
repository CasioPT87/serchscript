const requestConfig = require('./config.ts')
import type { MethodConfig, RequestConfig } from '../types/config/index'
import type { RequestParams } from '../types/index'
import { AnyAction } from 'redux'
import { StoreType } from '../state/index'
import { ThunkAction } from 'redux-thunk'

interface RequestOptions {
  method: MethodConfig['method']
  headers: { Accept: '*/*'; 'Content-Type'?: 'application/json' }
  body?: BodyInit
}

const createRequestOptions = ({
  config,
  data,
}: {
  config: MethodConfig
  data: object
}): RequestOptions => {
  let body = null

  const headers: { Accept: '*/*'; 'Content-Type'?: 'application/json' } = {
    Accept: '*/*',
  }

  if (data) {
    body = JSON.stringify(data)
    headers['Content-Type'] = 'application/json'
  }

  return {
    method: config.method,
    headers,
    body,
  }
}

const serverRequest =
  (config: MethodConfig) =>
  ({
    pathParams = null,
    searchParams = null,
    data = null,
  }: RequestParams = {}): ThunkAction<void, StoreType, unknown, AnyAction> => {
    return async dispatch => {
      return new Promise(async (res, rej) => {
        const url = new URL(process.env.SERVER_DOMAIN)

        let pathname = config.path
        if (config.pathParams) {
          config.pathParams.forEach(pathParam => {
            const hasReplacement = Boolean(pathParams && pathParams[pathParam])
            if (hasReplacement)
              pathname = pathname.replace(
                `:${pathParam}`,
                pathParams[pathParam]
              )
          })
        }

        url.pathname = pathname

        if (config.searchParams) {
          config.searchParams.forEach(searchParam => {
            const hasValue = Boolean(searchParams && searchParams[searchParam])
            if (hasValue)
              url.searchParams.append(searchParam, searchParams[searchParam])
          })
        }

        const requestOptions = createRequestOptions({ config, data })

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

interface ModifiedEntityMap {
  data?: {
    file: string
  }
}

type EntityMapValue = {
  data: { file: File | string; id: string }
} & ModifiedEntityMap

interface EntityMap {
  [index: string]: EntityMapValue
}

type ContentRest = {
  [index: string]: any
}

type Content = EntityMap & ContentRest

type ImageResponse = { filename: string }

const uploadImages =
  (config: RequestConfig['image']['upload']) =>
  ({
    entityMap,
  }: {
    entityMap: EntityMap
  }): ThunkAction<void, StoreType, unknown, AnyAction> =>
  async dispatch => {
    const { method, path } = config

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

      return new Promise(async (res, rej): Promise<void> => {
        await responseDealer({ response, res, rej })
      })
        .then((data: ImageResponse) => data)
        .catch(async (error: Error) => {
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

const createDispatchFns = ({
  fns,
  payload,
  dispatch,
}: {
  fns: MethodConfig['failDispatch']
  payload: any
  dispatch: (arg: any) => void
}) => {
  return fns.map(eachDispatchFn => {
    return dispatch(eachDispatchFn(payload))
  })
}

const responseDealer = async ({
  response,
  res,
  rej,
}: {
  response: Response
  res: (value: unknown) => void
  rej: (reason?: any) => void
}) => {
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

const createDigestedArticleEntityMap = ({
  uploadResponses,
  content,
}: {
  uploadResponses: ImageResponse[]
  content: EntityMap
}): EntityMapValue[] => {
  const { entityMap } = content
  const entityMapValues = Object.values(entityMap) as EntityMapValue[]
  const _entityMapValues = [...entityMapValues]

  for (let i = 0; i < _entityMapValues.length; i++) {
    const filename = uploadResponses[i].filename
    const entity = _entityMapValues[i]
    entity.data.file = filename
  }

  return _entityMapValues
}

const createDigestedContent = ({
  digestedEntities,
  content,
}: {
  digestedEntities: EntityMapValue[]
  content: Content
}): string => {
  return JSON.stringify({ ...content, entityMap: digestedEntities })
}

const processArticle =
  (
    conf:
      | RequestConfig['articles']['create']
      | RequestConfig['articles']['update']
  ) =>
  (uploadedImagesData: ImageResponse[]) =>
  (payload: { data: { content: Content } }) => {
    const {
      data: { content },
    } = payload
    const digestedEntities = createDigestedArticleEntityMap({
      uploadResponses: uploadedImagesData,
      content,
    })
    const digestedContent = createDigestedContent({ digestedEntities, content })
    return serverRequest(conf)({ data: digestedContent })
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
