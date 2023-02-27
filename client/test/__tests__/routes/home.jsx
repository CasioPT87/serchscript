const React = require('react')
const { fireEvent, screen } = require('@testing-library/react')
const { Articles } = require('../../../src/components')
const renderWithProviders = require('../../utils/test-utils')

describe('Articles Component', () => {
  test('there is a footer there', () => {
    renderWithProviders(<Articles />)

    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
