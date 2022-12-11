const React = require('react')

const CheckBox = ({ text, onChange, checked = true }) => {
  return (
    <label class="checkbox">
      {text}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
        className="checkbox__input"
      />
      <span class="checkbox__checkmark"></span>
    </label>
  )
}

module.exports = CheckBox
