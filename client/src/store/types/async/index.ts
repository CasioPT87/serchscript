import type { MethodConfig, RequestConfig } from '../config/index'

export interface RequestOptions {
  method: MethodConfig['method']
  headers: { Accept: '*/*'; 'Content-Type'?: 'application/json' }
  body?: BodyInit
}

interface ModifiedEntityMap {
  data?: {
    file: string
  }
}

export type EntityMapValue = {
  data: { file: File | string; id: string }
} & ModifiedEntityMap

export interface EntityMap {
  [index: string]: EntityMapValue
}

interface ContentRest {
  [index: string]: any
}

export type Content = EntityMap & ContentRest

export interface ImageResponse {
  filename: string
}
