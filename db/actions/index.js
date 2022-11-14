const actionsArticle = require("./articles");
const actionsComment = require("./comments");
const actionsAuth = require("./auth");

module.exports = {
  articles: {
    index: actionsArticle.index,
    show: actionsArticle.show,
    destroy: actionsArticle.destroy,
    destroyAll: actionsArticle.destroyAll,
    create: actionsArticle.create,
    update: actionsArticle.update,
  },
  comments: {
    index: actionsComment.index,
    indexForArticle: actionsComment.indexForArticle,
    destroy: actionsComment.destroy,
    destroyAll: actionsComment.destroyAll,
    create: actionsComment.create,
    update: actionsComment.update,
  },
  auth: {
    show: actionsAuth.show,
    create: actionsAuth.create,
  },
};
