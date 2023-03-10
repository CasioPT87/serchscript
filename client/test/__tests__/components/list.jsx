const React = require('react')
const { server } = require('../../env/after')
const {
  fireEvent,
  screen,
  waitFor,
  waitForElement,
  getByTestId,
} = require('@testing-library/react')
const { Articles, ArticleLinkList } = require('../../../src/components')
const defaultState = require('../../../src/store/state/index.ts')
const {
  renderWithProviders,
  renderWithRoutes,
} = require('../../utils/test-utils')
const { getArticleListResponse } = require('../../utils/data-mocks')

describe('ArticleLink List Component', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('renders', async () => {
    const { getByTestId } = renderWithProviders(<ArticleLinkList />)

    expect(getByTestId('articlelink-list')).toBeInTheDocument()
  })

  //   it('renders when there is articles created', async () => {
  //     const appState = {
  //       ...defaultState,
  //       articles: {
  //         list: getArticleListResponse(false),
  //       },
  //     }
  //     const { getByRole } = renderWithProviders(<Articles />, {
  //       preloadedState: appState,
  //     })

  //     const homeArticleCard = getByRole('heading', { name: /first article/i })

  //     expect(homeArticleCard).toBeInTheDocument()
  //   })

  //   it('directs to article when clicking on element of the list', async () => {
  //     const appState = {
  //       ...defaultState,
  //       articles: {
  //         list: getArticleListResponse(false),
  //       },
  //     }
  //     const { getByRole, getByText } = renderWithRoutes(null, {
  //       preloadedState: appState,
  //     })

  //     const homeArticleCard = getByRole('heading', { name: /first article/i })

  //     fireEvent.click(homeArticleCard)

  //     const content = await waitFor(() => getByText(/my article 1/i))

  //     expect(homeArticleCard).not.toBeInTheDocument()
  //     expect(content).toBeInTheDocument()
  //   })
})
