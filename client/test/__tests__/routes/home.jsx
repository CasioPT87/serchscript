const React = require('react')
const { server } = require('../../env/after')
const { fireEvent, screen } = require('@testing-library/react')
const { Articles } = require('../../../src/components')
const renderWithProviders = require('../../utils/test-utils')

describe('Articles Component', () => {
  // Establish API mocking before all tests.
  beforeAll(() => server.listen())
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => server.resetHandlers())
  // Clean up after the tests are finished.
  afterAll(() => server.close())

  test('there is a footer there', () => {
    renderWithProviders(<Articles />)

    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
