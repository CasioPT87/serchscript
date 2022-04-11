const actionsArticle = require('./articles')
const actionsComment = require('./comments')

module.exports = {
    articles: {
        index: actionsArticle.index,
        show: actionsArticle.show,
        destroy: actionsArticle.destroy,
        destroyAll: actionsArticle.destroyAll,
        create: actionsArticle.create,
        update: actionsArticle.update
    },
    comments: {
        index: actionsComment.index,
        indexForArticle: actionsComment.indexForArticle,
        destroy: actionsComment.destroy,
        destroyAll: actionsComment.destroyAll,
        create: actionsComment.create,
        update: actionsComment.update
    }
}