const { paramCase } = require('param-case')
const _ = require('lodash')
const { defaults } = require('../constants')
const Article = require('../../db/models/article')

// get list
const index = async req => {
  const limit = _.isEmpty(req.query)
    ? defaults.limitArticlesPerPage
    : Number(req.query.limit)
  const page = _.isEmpty(req.query)
    ? defaults.initialArticlesPage
    : Number(req.query.page)

  const options = {
    select: ['title', 'titleId', 'description', 'hidden', 'createdAt'],
    sort: { createdAt: 'asc' },
    page,
    limit,
  }

  if (req.isLogged) {
    return Article.paginate({}, options)
  }

  return Article.paginate({ hidden: false }, options)
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
const create = async req => {
  const {
    title = 'Escribe un titulo',
    description = 'Escribe una descripcion',
    content = 'El contenido esta vacio',
    hidden = true,
  } = req.body
  const article = new Article()
  article.setTitleId(title)
  if (!article.titleId) throw new Error('couldnt set title for article')
  const sameTitleIdArticle = await show({
    isLogged: true,
    params: { titleId: article.titleId },
  })
  if (sameTitleIdArticle)
    throw new Error('article with this title already exists')
  article.title = title
  article.description = description
  article.content = content
  article.hidden = hidden
  article.fecha = new Date().toISOString()

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
      content,
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

module.exports = { index, show, destroyAll, create, update, destroy }
