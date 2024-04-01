import styles from './style.module.scss'

type ButtonType = 'white'

type Button = {
  btnName: string
  disabled: boolean
  type?: ButtonType
  clickEvent: () => void
}

function Button({ btnName, disabled, type, clickEvent }: Button) {
  const customClass = () => {
    if (disabled) {
      return styles.disabled_button
    }
    if (type === 'white') {
      return styles.white_button
    } else {
      return styles.button
    }
  }
  return (
    <button className={customClass()} onClick={clickEvent} disabled={disabled}>
      {btnName}
    </button>
  )
}

export default Button
