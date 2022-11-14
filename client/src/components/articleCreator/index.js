const React = require('react')
const {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  AtomicBlockUtils,
} = require('draft-js')
const draftToHtml = require('draftjs-to-html')

class ArticleCreator extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorState: EditorState.createEmpty() }
    this.focus = () => this.refs.editor.focus()
    console.log('killoooooooooooooo')
  }

  onChange = editorState => {
    console.log('que te den')
    this.setState({ editorState })
  }

  getRawState = editorState => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())

    return draftToHtml(rawContentState)
  }

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    )
  }

  handlePastedFiles = files => {
    const formData = new FormData()
    formData.append('file', files[0])
    fetch('/api/uploads', { method: 'POST', body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.file) {
          setEditorState(insertImage(data.file)) //created below
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  uploadImage = async event => {
    const file = event.target.files[0]

    const formData = new FormData()

    // Update the formData object
    formData.append('myFile', file, file.name)

    const response = await fetch('/data/upload', {
      method: 'POST',
      body: formData,
    })

    const data = response.json()
    const { url } = data
    this.insertImage(url)
  }

  insertImage = ev => {
    console.log('ev', ev)
    const {
      target: { value: url },
    } = ev
    console.log('url', url)
    const { editorState } = this.state
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      { src: url }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })
    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' '
      ),
    })
  }

  render() {
    const { editorState } = this.state

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor'
    var contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder'
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={this.onChange}
            handlePastedFiles={this.handlePastedFiles}
            placeholder="Tell a story..."
            ref="editor"
            blockRendererFn={mediaBlockRenderer}
          />
          <label for="myfile">Select a file:</label>
          <input type="file" multiple onChange={this.insertImage} />
        </div>
      </div>
    )
  }
}

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    console.log('block', block)
    return { component: Media, editable: false }
  }
  return null
}

const Media = props => {
  console.log('media!!!')
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  console.log('entity', entity)
  const { src } = entity.getData()
  const type = entity.getType()
  console.log('cosas', src, type)
  if (type === 'IMAGE') {
    console.log('src', src)
    return <Image src={src} />
  }
  return null
}

const styles = {
  media: {},
}

const Image = props => {
  console.log('props', props)
  return <img src={props.src} style={styles.media} alt="Example" />
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
}

const StyleButton = ({ style, onToggle, active, label }) => {
  const onMouseDown = e => {
    e.preventDefault()
    onToggle(style)
  }

  const className = !active
    ? 'RichEditor-styleButton'
    : 'RichEditor-styleButton RichEditor-activeButton'

  return (
    <span className={className} onMouseDown={onMouseDown}>
      {label}
    </span>
  )
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
  { label: 'Fire', style: 'new-block-type-name' },
]

const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]

const InlineStyleControls = ({ editorState, onToggle }) => {
  var currentStyle = editorState.getCurrentInlineStyle()
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

module.exports = ArticleCreator
