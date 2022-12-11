const React = require('react')

const CheckBox = ({ text, onChange, checked = false }) => {
  return (
    <label className="checkbox">
      {text}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
        className="checkbox__input"
      />
      <span className="checkbox__checkmark"></span>
    </label>
  )
}

module.exports = CheckBox
