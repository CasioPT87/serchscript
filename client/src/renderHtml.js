const renderHtml = (html, preloadedState) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>SSR react</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"><script defer src="react.bundle.js"></script></head>
  <body>
    <div id="root">${html}</div>
    <script>
      // WARNING: See the following for security issues around embedding JSON in HTML:
      // https://redux.js.org/usage/server-rendering#security-considerations
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        "\\u003c"
      )}
    </script>
  </body>
</html>`;
};

module.exports = renderHtml
