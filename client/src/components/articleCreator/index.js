const React = require('react')
const {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
  convertFromRaw,
} = require('draft-js')
const { v4: uuidv4 } = require('uuid')
const { getFileExtension } = require('../../utils')

const { useEffect, useState } = React

class RichText extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorState: EditorState.createEmpty() }
  }

  componentDidMount() {
    const { articleContent } = this.props
    if (articleContent) {
      const articleData = JSON.parse(articleContent)
      const contentState = convertFromRaw(articleData)
      this.onChange(EditorState.createWithContent(contentState))
    }
  }

  onChange = editorState => {
    this.setState({ editorState }, () => {
      this.props.setText(convertToRaw(editorState.getCurrentContent()))
    })
  }

  handleReturn = e => {
    const selection = this.state.editorState.getSelection()
    const blockType = this.state.editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()

    if (e.keyCode === 13 && blockType === 'code-block') {
      this.onChange(RichUtils.insertSoftNewline(this.state.editorState))
      return 'handled'
    }
    return 'not-handled'
  }

  onTab = e => {
    const maxDepth = 4
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
  }

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    )
  }

  insertImage = file => {
    const uuid = uuidv4()
    const extension = getFileExtension(file.name)
    const id = `${uuid}.${extension}`
    const { editorState } = this.state
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      { file, id }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })

    const imageSrc = `/${id}`

    const nextState = AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      imageSrc
    )

    this.setState({
      editorState: nextState,
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
        <div className={className} onClick={this.focus}>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleReturn={this.handleReturn}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
            blockRendererFn={mediaBlockRenderer}
          />
        </div>

        <input
          type="file"
          id="myfile"
          name="myfile"
          onChange={e => this.insertImage(e.target.files[0])}
          className="form__submit form__submit--separated-sides"
        />
      </div>
    )
  }
}

const mediaBlockRenderer = block => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    }
  }
  return null
}

const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))
  const { file } = entity.getData()
  const type = entity.getType()
  const [base64Image, setBase64Image] = useState(null)

  useEffect(() => {
    async function getBase64() {
      if (type === 'IMAGE' && file) {
        if (file instanceof File) {
          fileReader = new FileReader()

          const _base64Image = await new Promise(resolve => {
            fileReader.onload = e => {
              const { result } = e.target
              if (result) {
                resolve(result)
              }
            }
            fileReader.readAsDataURL(file)
          })
          setBase64Image(_base64Image)
        } else if (file && typeof file === 'string') {
          setBase64Image(`/${file}`)
        }
      }
    }

    getBase64()
  }, [file])

  if (!base64Image) return null

  return <img src={base64Image} />
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote'
    default:
      return null
  }
}

class StyleButton extends React.Component {
  constructor() {
    super()
    this.onToggle = e => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    }
  }

  render() {
    let className = 'RichEditor-styleButton'
    if (this.props.active) {
      className += ' RichEditor-activeButton'
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    )
  }
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
]

const BlockStyleControls = props => {
  const { editorState } = props
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
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}

module.exports = RichText
