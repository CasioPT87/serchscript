export interface Article {
  _id: string
  comments: CommentElement[]
  titleId: string
  title: string
  description: string
  content: string
  hidden: boolean
  fecha: string
  createdAt: string
  updatedAt: string
}

interface ArticleListElement {
  _id: string
  titleId: string
  title: string
  description: string
  hidden: boolean
  createdAt: string
}

export interface ArticleList {
  list:
    | Record<string, never>
    | {
        docs: ArticleListElement[]
        totalDocs: number
        limit: number
        totalPages: number
        page: number
        pagingCounter: number
        hasPrevPage: boolean
        hasNextPage: boolean
        prevPage: number | null
        nextPage: number | null
      }
}

export interface CommentElement {
  _id: string
  content: string
  hidden: boolean
  article: Pick<Article, '_id'>
  createdAt: string
  updatedAt: string
}

export type Logged = boolean

export interface Message {
  article: string | null
  articles: string | null
  auth: string | null
}
