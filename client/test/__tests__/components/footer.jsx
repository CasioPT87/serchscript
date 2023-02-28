const React = require('react')
const { fireEvent, screen } = require('@testing-library/react')
const { Footer } = require('../../../src/components')
const { renderWithProviders } = require('../../utils/test-utils')

describe('Footer Component', () => {
  test('there is a footer there', () => {
    renderWithProviders(<Footer />)

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
