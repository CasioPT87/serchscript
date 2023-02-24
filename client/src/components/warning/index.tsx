const Warning = ({ show, text }: { show: boolean; text: string }) => {
  if (!show) return null
  return <h3 className="warning">{text}</h3>
}

module.exports = Warning
