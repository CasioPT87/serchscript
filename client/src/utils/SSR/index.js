const React = require("react");
const { Provider } = require("react-redux");
const ReactDOMServer = require("react-dom/server");
const Components = require("../../components");
const { setUpStore } = require("../../store/setUp");
const renderHtml = require("../../renderHtml");

const ComponentsKillo = {
  articles: <Components.Articles />,
  article: <Components.Article />,
  articleForm: <Components.ArticleForm />,
  home: <Components.Home />,
  loginForm: <Components.LoginForm />
};

const getComponent = (name) => ComponentsKillo[name];

const getInitialComponentsTree = (store, componentName) => {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <Components.MainFrame>{getComponent(componentName)}</Components.MainFrame>
    </Provider>
  );
};

module.exports = {
  SSRComponentsTree: (initialState = {}, componentName) => {
    const store = setUpStore(initialState);
    const preloadedState = store.getState();
    const componentsTree = getInitialComponentsTree(store, componentName);
    return renderHtml(componentsTree, preloadedState);
  },
};
