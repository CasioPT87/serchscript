const React = require("react");
const { Provider, useSelector } = require("react-redux");
const ReactDOMServer = require("react-dom/server");
const { setUpStore } = require("../../store/setUp");
const renderHtml = require("../../renderHtml");
const Articles = require("../articles");
const Article = require("../article");
const Home = require("../home");
const LoginForm = require("../loginForm");
const ArticleForm = require("../articleForm");
const MainFrameComponent = require("../mainFrame");

const Components = {
  articles: <Articles />,
  article: <Article />,
  articleForm: <ArticleForm />,
  home: <Home />,
  loginForm: <LoginForm />,
};

const getComponent = (name) => Components[name];

const getInitialComponentsTree  = (store, componentName) => {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <MainFrameComponent>{getComponent(componentName)}</MainFrameComponent>
    </Provider>
  );
};

module.exports = {
  App: MainFrameComponent,
  AppString: (initialState = {}, componentName) => {
    const store = setUpStore(initialState);
    const preloadedState = store.getState();
    const componentsTree = getInitialComponentsTree(store, componentName);
    return renderHtml(componentsTree, preloadedState);
  },
};
