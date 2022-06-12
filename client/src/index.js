const React = require("react");
const { hydrate } = require("react-dom");
const { createStore } = require("redux");
const { Provider } = require("react-redux");
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Articles from "./components/articles";
import Article from "./components/article";
const reducer = require("./reducer");
const { App: RootComponent } = require("./components/main/App.jsx");

const ReactDOMServer = require("react-dom/server");

const store = createStore(
  reducer,
  window.__PRELOADED_STATE__,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const leches = ReactDOMServer.renderToString(
  <Provider store={store}>
    <RootComponent>
        <BrowserRouter>
          <div>
            <Link to="/">Articles</Link> | <Link to="/article">One Article</Link>
          </div>
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="article" element={<Article />} />
          </Routes>
        </BrowserRouter>
    </RootComponent>
  </Provider>,
  document.getElementById("root")
);

setTimeout(() => {
  alert('ke keeee?')
  document.getElementById('root').replaceWith('leches')
}, 2000)




