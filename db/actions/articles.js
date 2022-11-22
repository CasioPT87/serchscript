const Article = require('../../db/models/article')

// get list
const index = () => {
  return Article.find({})
}

// get one
const show = async req => {
  const { id } = req.params
  const article = await Article.findOne({
    id,
    // fecha: { $gt: { fecha: new Date(new Date() - 60000 * 60).toISOString() } },
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
  console.log({ content: typeof content })
  console.log({ req: req.body })
  const article = new Article()
  article.title = title
  article.description = description
  article.content = content
  article.hidden = hidden
  article.fecha = new Date().toISOString()

  return article.save()
}

// update one
const update = async (req, res, next) => {
  const { id } = req.params

  const { title, description, content, hidden } = req.body

  const filteredValues = Object.entries({
    title,
    description,
    content,
    hidden,
  }).reduce((prev, [k, v]) => {
    if (v) {
      return {
        ...prev,
        [k]: v,
      }
    }
    return prev
  }, {})

  return Article.findOneAndUpdate({ _id: id }, filteredValues, { new: true })
}

// delete one
const destroy = async req => {
  const { id } = req.params
  return Article.findOneAndDelete({ _id: id })
}

module.exports = { index, show, destroyAll, create, update, destroy }
