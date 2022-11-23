const React = require('react')
const { useState } = require('react')
const { v4: uuidv4 } = require('uuid');
const ArticleCreator = require('../articleCreator')

function articleForm() {
  const [title, setTitle] = useState('this is a fake title')
  const [description, setDescription] = useState('this is a fake description')
  const [content, setContent] = useState('this is a fake content')
  const [hidden, setHidden] = useState(false)
  const [message, setMessage] = useState('')
  
  const digestEntities = async ({ entityMap }) => {

    const uploadRequests = Object.values(entityMap).map((entity, index) => {
      const { data: file } = entity
      const id = uuidv4()
      const body = new FormData()
      body.append('id', id)
      body.append('file', file)
    
      return fetch('/data/images', {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, gr',
        },
        body, // body data type must match "Content-Type" header
      })
    })

    const uploadResponses = await Promise.all(uploadRequests)
    for (let i = 0; i < entityMap.length; i++) {
      const entity = entityMap[i]
      entity.data.file = uploadResponses[i]
    }
    return entityMap        
  }

  const submit = async ({ title, description, content, hidden = false }) => {
    const digestedEntities = digestEntities(content)

    let res = await fetch('http://localhost:8880/data/admin/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
        Accept: '*/*',
      },
      body: JSON.stringify({ title, description, content: JSON.stringify({ ...content, entityMap: digestedEntities }), hidden }),
    })

    console.log(res)
  }

  let handleSubmit = async e => {
    e.preventDefault()
    await submit({
      title,
      description,
      content,
    })
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
        <ArticleCreator setText={setContent} />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  )
}

module.exports = articleForm
