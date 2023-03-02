import React, { useState } from 'react'

const useFormInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = String(e.target.value)
    setValue(value)
  }

  const inputProps = {
    value,
    onChange: handleChange,
  }

  return inputProps
}

module.exports = useFormInput
