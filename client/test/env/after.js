import '@testing-library/jest-dom'
import { setupServer } from 'msw/node'
const { handlers, rest } = require('../utils/server-mocks')

// This configures a request mocking server with the given request handlers.
module.exports = { server: setupServer(...handlers), rest }
