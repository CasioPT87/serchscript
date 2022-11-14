const { SSRComponentsTree } = require("../../../../client/src/utils/SSR");
const executeFetchers = require("../../../../api/fetchers");

const sendSSRResposeView = async ({ res, fetchers, dataName }) => {
  const store = await executeFetchers(fetchers);
  res.contentType("text/html");
  res.status(200);
  return res.send(SSRComponentsTree(store, dataName));
};

module.exports = {
  sendSSRResposeView,
};
