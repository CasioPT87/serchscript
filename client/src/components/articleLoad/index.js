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
  convertFromHTML,
} = require('draft-js')

const data = require('../../../../data/hey')

const getHTMLForCheatsheet = cs => {
  const key = Object.keys(cs)[0]
  const title = `<h3>${key}</h3>`
  const content = cs[key].scenarios.reduce((prev, currScenario) => {
    const htmlScenario = `
      <h4>${currScenario.title}</h4>
      ${currScenario.content.body}
    `
    return prev + htmlScenario
  }, title)
  return content
}

const cheatsheetMachine = () => {
  const groupNames = Object.keys(data)
  return groupNames.map(groupName => {
    const cssForGroup = data[groupName].cheatsheets
    const CSTitle = `<h1>${groupName}</h1>`
    return {
      title: groupName,
      stringContent: cssForGroup.reduce((prev, currCS) => {
        const currCSHTML = getHTMLForCheatsheet(currCS)
        return prev + currCSHTML
      }, CSTitle),
    }
  })
}

function articleLoad() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('this is a fake title')
  const [description, setDescription] = useState('this is a fake description')
  const [content, setContent] = useState(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const content = cheatsheetMachine().map(({title, stringContent}) => {
      const blocksFromHTML = convertFromHTML(stringContent)
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      )
      const editorState = EditorState.createWithContent(contentState)
      return {
        title,
        content: convertToRaw(editorState.getCurrentContent()),
      }
    })

    setContent(content)
  }, [])

  let handleSubmit = async e => {
    e.preventDefault()
    try {
      content.forEach(({ title, content }) => {
        dispatch(
          createArticle({
            title,
            description,
            content,
            hidden,
          })
        )
      })
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
