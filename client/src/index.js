const React = require("react");
const { hydrate } = require("react-dom");
const { createStore } = require("redux");
const { Provider } = require("react-redux");
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Articles from "./components/articles";
import Article from "./components/article";
import Home from "./components/home";
const reducer = require("./reducer");
const { App: RootComponent } = require("./components/main/App.jsx");

const store = createStore(
  reducer,
  window.__PRELOADED_STATE__,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

hydrate(
  <Provider store={store}>
    <RootComponent>
      <>
        <BrowserRouter>
          <div>
            <Link to="/">Home</Link> | <Link to="/articles">Articles</Link>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="articles" element={<Articles />} />
          </Routes>
        </BrowserRouter>
      </>
    </RootComponent>
  </Provider>,
  document.getElementById("root")
);
