const { paramCase } = require('param-case')
const _ = require('lodash')
const { defaults } = require('../constants')
const Article = require('../../db/models/article')

// get list
const index = async req => {
  const limit = _.isEmpty(req.query.limit)
    ? defaults.limitArticlesPerPage
    : Number(req.query.limit)
  const page = _.isEmpty(req.query.page)
    ? defaults.initialArticlesPage
    : Number(req.query.page)
  const text = _.isEmpty(req.query.text)
    ? defaults.initialArticlesTextSearch
    : String(req.query.text)

  const options = {
    select: ['title', 'titleId', 'description', 'hidden', 'createdAt'],
    sort: { createdAt: 'asc' },
    page,
    limit,
  }

  const textSearchFilter = text
    ? {
        $or: [
          {
            title: new RegExp(text, 'i'),
          },
          {
            description: new RegExp(text, 'i'),
          },
        ],
      }
    : {}

  if (req.isLogged) {
    return Article.paginate({ ...textSearchFilter }, options)
  }

  return Article.paginate({ ...textSearchFilter, hidden: false }, options)
}

// get one
const show = async req => {
  const { titleId, id } = req.params
  const queryParams = {}
  if (id) queryParams._id = id
  if (titleId) queryParams.titleId = titleId

  if (!req.isLogged) {
    queryParams.hidden = false
  }
  const article = await Article.findOne({
    ...queryParams,
  }).populate('comments')
  return article
}

// delete all
const destroyAll = () => {
  return Article.deleteMany({})
}

// create new
const create = async (req, res) => {
  const {
    title = 'Default title',
    description = 'Default description',
    content = null,
    hidden = true,
  } = req.body

  const article = new Article()
  article.setTitleId(title)

  if (!article.titleId) {
    res.status(422)
    return res.send('Error: Articles need a title')
  }
  const sameTitleIdArticle = await show({
    isLogged: true,
    params: { titleId: article.titleId },
  })
  if (sameTitleIdArticle) {
    res.status(409)
    return res.send('Error: Article title is duplicated')
  }
  article.title = title
  article.description = description
  article.content = content
  article.hidden = hidden
  article.date = new Date().toISOString()

  return article.save()
}

// update one
const update = async req => {
  const { id } = req.params

  const { title, description, content, hidden } = req.body

  return Article.findOneAndUpdate(
    { _id: id },
    {
      title,
      titleId: paramCase(title),
      description,
      content: content,
      hidden,
    },
    { new: true }
  )
}

// delete one
const destroy = async req => {
  const { id } = req.params
  return Article.findOneAndDelete({ _id: id })
}

const links = async req => {
  const hey = Article.find({}, 'title titleId')
  console.log('hey', hey)
  return Article.find({}, 'title titleId')
}

module.exports = { index, show, destroyAll, create, update, destroy, links }
