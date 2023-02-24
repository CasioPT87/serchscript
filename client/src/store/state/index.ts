import type { Article, ArticleList, Message, Logged } from '../types/entities'

export type StoreType = Readonly<{
  articles: ArticleList
  article: Article
  logged: Logged
  message: Message
}>

const defaultState: StoreType = {
  articles: {
    list: {},
  },
  article: null,
  logged: false,
  message: {
    article: null,
    articles: null,
    auth: null,
  },
}

module.exports = defaultState
