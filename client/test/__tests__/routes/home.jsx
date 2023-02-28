const React = require('react')
const { server } = require('../../env/after')
const { fireEvent, screen, waitFor } = require('@testing-library/react')
const { Articles } = require('../../../src/components')
const defaultState = require('../../../src/store/state/index.ts')
const {
  renderWithProviders,
  renderWithRoutes,
} = require('../../utils/test-utils')
const { getArticleListResponse } = require('../../utils/data-mocks')

describe('Articles Component', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('renders when no articles have been creted', async () => {
    const { getByRole } = renderWithProviders(<Articles />)

    expect(getByRole('navigation')).toBeInTheDocument()
  })

  it('renders when there is articles created', async () => {
    const appState = {
      ...defaultState,
      articles: {
        list: getArticleListResponse(false),
      },
    }
    const { getByRole } = renderWithProviders(<Articles />, {
      preloadedState: appState,
    })

    expect(getByRole('navigation')).toBeInTheDocument()
  })

  it.only('directs to article when clicking on element of the list', async () => {
    const appState = {
      ...defaultState,
      articles: {
        list: getArticleListResponse(false),
      },
    }
    const { getByRole, getByText } = renderWithProviders(<Articles />, {
      preloadedState: appState,
    })

    fireEvent.click(screen.getByRole('heading', { name: /first article/i }))

    const header = await waitFor(() =>
      getByRole('heading', { name: /first article/i })
    )
    const content = await waitFor(() => getByText(/my article 1/i))

    screen.debug()

    expect(getByRole('navigation')).toBeInTheDocument()
  })
})
