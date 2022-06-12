const React = require("react");
const { Provider, useSelector } = require("react-redux");
const ReactDOMServer = require("react-dom/server");
const { createStore } = require("redux");
const reducer = require("../../reducer");
const renderHtml = require("../../renderHtml");
const Articles = require("../articles");
const Article = require("../article");
const Home = require("../home");
const ArticleForm = require("../articleForm");
const RootComponent = require("../root");

const Components = {
  articles: <Articles />,
  article: <Article />,
  articleForm: <ArticleForm />,
  home: <Home />,
};

const getComponent = (name) => Components[name];

const Root = (store, compName) => {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <RootComponent>{getComponent(compName)}</RootComponent>
    </Provider>
  );
};

module.exports = {
  App: RootComponent,
  AppString: (initialState, compName) => {
    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();
    const component = Root(store, compName);
    return renderHtml(component, preloadedState);
  },
};
