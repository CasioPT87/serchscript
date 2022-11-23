const { SSRComponentsTree } = require('../../../../client/src/utils/SSR')
const executeFetchers = require('../../../../api/fetchers')

const sendSSRResposeView = async ({ req, res, fetchers, dataName }) => {
  const store = await executeFetchers({ req, fetchers })
  console.log({ store })
  res.contentType('text/html')
  res.status(200)
  return res.send(SSRComponentsTree(store, dataName))
}

module.exports = {
  sendSSRResposeView,
}
