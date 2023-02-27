const React = require('react')
const { fireEvent, screen } = require('@testing-library/react')
const Footer = require('../../../src/components/footer/index.tsx')
const renderWithProviders = require('../../utils/test-utils')

describe('Footer Component', () => {
  test('first', () => {
    renderWithProviders(<Footer />)

    expect(screen.getByTestId('eyy')).toBeInTheDocument()
  })
})
