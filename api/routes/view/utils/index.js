const { SSRComponentsTree } = require('../../../../client/src/utils/SSR')
const executeFetchers = require('../../../../api/fetchers')

const sendSSRResposeView = async ({
  req,
  res,
  fetchers,
  dataName,
  errorHandler,
}) => {
  try {
    const store = await executeFetchers({ req, fetchers })
    res.contentType('text/html')
    res.status(200)
    return res.send(SSRComponentsTree(store, dataName))
  } catch (e) {
    errorHandler(e)
  }
}

module.exports = {
  sendSSRResposeView,
}
