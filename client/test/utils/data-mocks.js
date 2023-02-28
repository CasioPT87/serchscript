const articleList = [
  {
    _id: '63fd35359d44c4a9c6f8e11a',
    titleId: 'first-article',
    title: 'first article',
    description: 'my title 1',
    content:
      '{"blocks":[{"key":"8vq27","text":"my article 1","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":[]}',
    hidden: false,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
  {
    _id: '63fd35359d44c4a9c6f8e11b',
    titleId: 'second-article',
    title: 'second article',
    description: 'my title 2',
    content:
      '{"blocks":[{"key":"8vq27","text":"my article 2","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":[]}',
    hidden: false,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
  {
    _id: '63fd35359d44c4a9c6f8e11c',
    titleId: 'third-article',
    title: 'third article',
    description: 'my title 3',
    content:
      '{"blocks":[{"key":"8vq27","text":"my article 3","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":[]}',
    hidden: false,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
  {
    _id: '63fd35359d44c4a9c6f8e11d',
    titleId: 'fourth-article',
    title: 'fourth article',
    description: 'my title 4',
    content:
      '{"blocks":[{"key":"8vq27","text":"my article 4","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":[]}',
    hidden: false,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
  {
    _id: '63fd35359d44c4a9c6f8e11e',
    titleId: 'fifth-article',
    title: 'fifth article',
    description: 'my title 5',
    content:
      '{"blocks":[{"key":"8vq27","text":"my article 5","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":[]}',
    hidden: false,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
  {
    _id: '63fd35359d44c4a9c6f8e11f',
    titleId: 'sixth-article',
    title: 'sixth article',
    description: 'my title 6',
    content:
      '{"blocks":[{"key":"8vq27","text":"my article 6","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":[]}',
    hidden: true,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
  {
    _id: '63fd35359d44c4a9c6f8e11g',
    titleId: 'seventh-article',
    title: 'seventh article',
    content:
      '{"blocks":[{"key":"8vq27","text":"my article 7","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":[]}',
    description: 'my title 7',
    hidden: false,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
]

const getArticle = (titleId, isAuthenticated = false) => {
  return articleList
    .filter(a => {
      if (!isAuthenticated) {
        return !a.hidden
      }
      return true
    })
    .find(a => a.titleId === titleId)
}

const getArticleListResponse = authorized => {
  let docs = articleList
  if (!authorized) {
    docs = articleList.filter(a => !a.hidden)
  }
  return {
    docs,
    totalDocs: 7,
    limit: 5,
    totalPages: 2,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: 2,
  }
}

module.exports = {
  getArticleListResponse,
  getArticle,
}
