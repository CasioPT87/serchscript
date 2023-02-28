import { rest } from 'msw'
const { getCookie } = require('../../src/utils/index.tsx')
const { getArticleListResponse } = require('./data-mocks')

const createURL = path => {
  return `${process.env.DEFAULT_SERVER_DOMAIN}${path}`
}

module.exports = {
  handlers: [
    rest.get(createURL('/articles/:titleId'), (req, res, ctx) => {
      // Check if the user is authenticated in this session
      const isAuthenticated = getCookie()
      // If authenticated, return a mocked user details
      return res(
        ctx.status(200),
        ctx.json(getArticleListResponse(isAuthenticated))
      )
    }),
    rest.get(createURL('/data/articles'), (req, res, ctx) => {
      // Check if the user is authenticated in this session
      const isAuthenticated = getCookie()
      // If authenticated, return a mocked user details
      return res(
        ctx.status(200),
        ctx.json(getArticleListResponse(isAuthenticated))
      )
    }),
  ],
  rest,
}
