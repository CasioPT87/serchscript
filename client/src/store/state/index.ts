import type {
  Article,
  ArticleList,
  Message,
  Logged,
  ArticleLinkList,
} from '../types/entities'

export type StoreType = Readonly<{
  articles: ArticleList
  article: Article
  logged: Logged
  message: Message
  articleLinkList?: ArticleLinkList[]
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
  articleLinkList: null,
}

module.exports = defaultState
