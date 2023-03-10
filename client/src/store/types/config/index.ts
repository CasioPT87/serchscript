import type { ActionReturn } from '../../actions/index'

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT'

type ArticleMethod = 'list' | 'show' | 'create' | 'update' | 'links'
type ImageMethod = 'upload'
type CommentMethod = 'create'
type AuthMethod = 'login' | 'logout'

type DispatchType = (...arg: any) => ActionReturn<any>

export interface MethodConfig {
  method: Method
  path: string
  searchParams?: ['page', 'limit', 'text']
  pathParams?: string[]
  successDispatch?: DispatchType[]
  failDispatch: DispatchType[]
}

export interface RequestConfig {
  articles: {
    [k in ArticleMethod]: MethodConfig
  }
  image: {
    [k in ImageMethod]: MethodConfig
  }
  comment: {
    [k in CommentMethod]: MethodConfig
  }
  auth: {
    [k in AuthMethod]: MethodConfig
  }
}
