const articleList = [
  {
    _id: '63fd35359d44c4a9c6f8e11a',
    titleId: 'first-article',
    title: 'first article',
    description: 'my title 1',
    hidden: false,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
  {
    _id: '63fd35359d44c4a9c6f8e11b',
    titleId: 'second-article',
    title: 'second article',
    description: 'my title 2',
    hidden: false,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
  {
    _id: '63fd35359d44c4a9c6f8e11c',
    titleId: 'third-article',
    title: 'third article',
    description: 'my title 3',
    hidden: false,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
  {
    _id: '63fd35359d44c4a9c6f8e11d',
    titleId: 'fourth-article',
    title: 'fourth article',
    description: 'my title 4',
    hidden: false,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
  {
    _id: '63fd35359d44c4a9c6f8e11e',
    titleId: 'fifth-article',
    title: 'fifth article',
    description: 'my title 5',
    hidden: false,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
  {
    _id: '63fd35359d44c4a9c6f8e11f',
    titleId: 'sixth-article',
    title: 'sixth article',
    description: 'my title 6',
    hidden: true,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
  {
    _id: '63fd35359d44c4a9c6f8e11g',
    titleId: 'seventh-article',
    title: 'seventh article',
    description: 'my title 7',
    hidden: false,
    createdAt: '2023-02-27T22:56:53.926Z',
  },
]

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
}
