import { rest } from 'msw'
const { getCookie } = require('../../src/utils/index.tsx')

module.exports = {
  handlers: [
    rest.post('/login', (req, res, ctx) => {
      // Persist user's authentication in the session
      sessionStorage.setItem('is-authenticated', 'true')
      return res(
        // Respond with a 200 status code
        ctx.status(200)
      )
    }),
    rest.get('http://localhost:8880/data/articles', (req, res, ctx) => {
      // Check if the user is authenticated in this session
      const isAuthenticated = getCookie()
      if (!isAuthenticated) {
        // If not authenticated, respond with a 403 error
        return res(
          ctx.status(403),
          ctx.json({
            errorMessage: 'Not authorized',
          })
        )
      }
      // If authenticated, return a mocked user details
      return res(
        ctx.status(200),
        ctx.json({
          username: 'admin',
        })
      )
    }),
  ],
  rest,
}
