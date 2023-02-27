const React = require('react')
const { fireEvent, screen } = require('@testing-library/react')
const Footer = require('../../../src/components')
const renderWithProviders = require('../../utils/test-utils')

describe('Footer Component', () => {
  test('first', () => {
    expect(screen.getByTestId('eyy')).toBeInTheDocument()
  })
})
