import styles from './style.module.scss'
import { useState } from 'react'

type InputType = {
  type: string
  placeholder?: string
  onChange?: (e: string) => void
  value?: string
  disabled?: boolean
}

function TextInput({
  type,
  placeholder,
  onChange,
  value,
  disabled,
}: InputType) {
  const [text, setText] = useState('')
  const inputValue = () => {
    if (value) return value
    return text
  }
  return (
    <div className={styles.container}>
      <input
        type={type}
        placeholder={placeholder ? placeholder : ''}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value)
          }
          setText(e.target.value)
        }}
        value={inputValue()}
        disabled={disabled}
      />
    </div>
  )
}

export default TextInput
