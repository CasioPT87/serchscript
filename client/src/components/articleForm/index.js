const React = require('react')
const { useState, useEffect } = require('react')
const { useSelector } = require('react-redux')
const { v4: uuidv4 } = require('uuid')
const ArticleCreator = require('../articleCreator')

const digestEntities = async ({ entityMap }) => {
  const entityMapValues = Object.values(entityMap)
  const uploadRequests = entityMapValues.map(async (entity, index) => {
    const {
      data: { file },
    } = entity
    const name = uuidv4()
    const body = new FormData()
    body.append('name', name)
    body.append('file', file, name)

    const response = await fetch('/data/admin/images', {
      method: 'POST',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, gr',
      },
      body,
    })
    return response.json()
  })

  const uploadResponses = await Promise.all(uploadRequests)
  for (let i = 0; i < entityMapValues.length; i++) {
    const entity = entityMapValues[i]
    entity.data.file = uploadResponses[i].filename
  }

  return Object.assign({}, entityMapValues)
}

const submit = async ({ title, description, content, hidden = false }) => {
  const digestedEntities = await digestEntities(content)

  await fetch('http://localhost:8880/data/admin/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Connection: 'keep-alive',
      Accept: '*/*',
    },
    body: JSON.stringify({
      title,
      description,
      content: JSON.stringify({ ...content, entityMap: digestedEntities }),
      hidden,
    }),
  })
}

function articleForm() {
  const article = useSelector(store => store.article)
  const [title, setTitle] = useState('this is a fake title')
  const [description, setDescription] = useState('this is a fake description')
  const [content, setContent] = useState('this is a fake content')
  const [hidden, setHidden] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (article) {
      const { title, description, content } = article
      setTitle(title)
      setDescription(description)
      setContent(content)
    }
  }, [article])

  const reset = (error = null) => {
    if (error) {
      return setMessage(e.message)
    }
    setTitle('')
    setDescription('')
    setContent('')
    setMessage('article uploaded correctly')
  }

  let handleSubmit = async e => {
    e.preventDefault()
    try {
      await submit({
        title,
        description,
        content,
      })
    } catch (e) {
      return reset(e)
    }
    reset()
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <ArticleCreator setText={setContent} articleContent={article.content} />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  )
}

module.exports = articleForm
