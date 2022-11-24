const Article = require('../../db/models/article')

// get list
const index = req => {
  if (req.isLogged) {
    return Article.find({})
  }
  return Article.find({ hidden: false })
}

// get one
const show = async req => {
  const { id } = req.params
  const queryParams = {
    _id: id,
  }
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
const create = req => {
  const {
    title = 'Escribe un titulo',
    description = 'Escribe una descripcion',
    content = 'El contenido esta vacio',
    hidden = true,
  } = req.body
  const article = new Article()
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
