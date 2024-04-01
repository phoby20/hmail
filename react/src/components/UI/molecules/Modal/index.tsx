import { useEffect, useRef, useState } from 'react'
import style from './style.module.scss'
import Button from '../../atoms/Button'
import {
  handleInputEvent,
  showMaxTextLengthErr,
  showNoInputErr,
} from './functions'
import { constants } from '../../../../constants'

const { MAX_INPUT_LENGTH } = constants

type Modal = {
  maxTextLengthErr: boolean
  noInputErr: boolean
  sendEvent: (inputText: string) => void
  cancelEvent: () => void
  setMaxTextLengthErr: React.Dispatch<React.SetStateAction<boolean>>
  setNoInputErr: React.Dispatch<React.SetStateAction<boolean>>
}

// 최대 입력가능한 글자수

function Modal({
  maxTextLengthErr,
  noInputErr,
  sendEvent,
  cancelEvent,
  setMaxTextLengthErr,
  setNoInputErr,
}: Modal) {
  const inputElement = useRef<HTMLDivElement>(null)
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    inputElement.current?.focus()
  }, [])

  return (
    <div className={style.modal_overlay}>
      <div className={style.modal_overlay_window}>
        <div className={style.modal_overlay_window_title}>
          <h2>지금 따뜻한 마음을 전해보세요</h2>
        </div>
        <div className={style.modal_overlay_window_content}>
          <div
            ref={inputElement}
            className={style.modal_overlay_window_content_input}
            onInput={(e) =>
              handleInputEvent(
                e,
                MAX_INPUT_LENGTH,
                setInputText,
                setMaxTextLengthErr,
                setNoInputErr,
              )
            }
            contentEditable
            role="textbox"
          ></div>
          <div className={style.modal_overlay_window_content_err}>
            {maxTextLengthErr ? showMaxTextLengthErr() : ''}
            {noInputErr ? showNoInputErr() : ''}
          </div>
        </div>
        <div className={style.modal_overlay_window_buttons}>
          <Button
            btnName="보내기"
            disabled={false}
            clickEvent={() => sendEvent(inputText)}
          />
          <Button
            btnName="취소"
            type="white"
            disabled={false}
            clickEvent={cancelEvent}
          />
        </div>
      </div>
    </div>
  )
}

export default Modal
