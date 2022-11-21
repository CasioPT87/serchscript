const React = require('react')
const { Provider } = require('react-redux')
const { StaticRouter } = require('react-router-dom/server')
const ReactDOMServer = require('react-dom/server')
const Components = require('../../components')
const setUpStore = require('../../store/setUp')

const ComponentsLibrary = {
  articles: <Components.Articles />,
  article: <Components.Article />,
  articleForm: <Components.ArticleForm />,
  home: <Components.Home />,
  loginForm: <Components.LoginForm />,
}

const getComponent = name => ComponentsLibrary[name]

const getInitialComponentsTree = (store, componentName) => {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter>
        <Components.MainFrame>
          {getComponent(componentName)}
        </Components.MainFrame>
      </StaticRouter>
    </Provider>
  )
}

const renderHtml = (html, preloadedState) => {
  const preloadedStateJSON = `${JSON.stringify(preloadedState).replace(
    /</g,
    '\\u003c'
  )}`
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>SSR react</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"><script defer src="http://localhost:8880/react.bundle.js"></script></head>
    <link rel="stylesheet" type="text/css" href="http://localhost:8880/react.css">
    <script>
      // WARNING: See the following for security issues around embedding JSON in HTML:
      // https://redux.js.org/usage/server-rendering#security-considerations
      window.__PRELOADED_STATE__ = ${preloadedStateJSON}
      window.jamon = 'jamon'
    </script>
  
    <body>
      <div id="root">${html}</div>
    </body>
  </html>`
}

module.exports = {
  SSRComponentsTree: (initialState = {}, componentName) => {
    const store = setUpStore(initialState)
    const preloadedState = store.getState()
    const componentsTree = getInitialComponentsTree(store, componentName)
    return renderHtml(componentsTree, preloadedState)
  },
}
