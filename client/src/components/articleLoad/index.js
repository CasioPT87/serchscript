const React = require('react')
const { useState, useEffect } = require('react')
const { useSelector, useDispatch } = require('react-redux')
const ArticleCreator = require('../articleCreator')
const { createArticle, updateArticle } = require('../../store/async')
const {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML
} = require('draft-js')

const data = require('../../../../data/cheatsheets')

const cheatsheetMachine = () => {
  const names = [Object.keys(data)[0]]
  console.log({ names })
  return names
    .map(name => {
      const scenariosForCS = data[name]
      const CSTitle = `<h1>${name}</h1>`
      return scenariosForCS.reduce((prev, currScenario) => {
        const scenarioHTML = `       
        <h3>${currScenario.title}</h3>
        ${currScenario.content.body}
      `
        return prev + scenarioHTML
      }, CSTitle)
    })
    .toString()
}

function articleLoad() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('this is a fake title')
  const [description, setDescription] = useState('this is a fake description')
  const [content, setContent] = useState(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    setTitle('this is a test title')
    setDescription('this is a test description')
    const blocksFromHTML = convertFromHTML(cheatsheetMachine())
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )
    const editorState = EditorState.createWithContent(contentState)
    const raw = convertToRaw(editorState.getCurrentContent())
    setContent(raw)
  }, [])

  let handleSubmit = async e => {
    e.preventDefault()
    try {
      dispatch(
        createArticle({
          title,
          description,
          content,
          hidden,
        })
      )
    } catch (e) {
      console.log(e.message)
    }
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

        <button type="submit">Andale Wey</button>

        <div>
          <label htmlFor="hiddenArticle">Hidden article</label>
          <input
            type="checkbox"
            id="hiddenArticle"
            name="hiddenArticle"
            checked={hidden}
            onChange={() => setHidden(!hidden)}
          />
        </div>
      </form>
    </div>
  )
}

module.exports = articleLoad
