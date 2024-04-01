import { useEffect, useRef, useState } from 'react'
import style from './style.module.scss'
import Button from '../../atoms/Button'
import { LetterDetail } from '../../../../type/letter'
import worldMap from '../../../../media/img/world_map.png'

type LetterDetailModal = {
  letter: LetterDetail
  cancelEvent: () => void
}

const backgroundStyle = {
  backgroundImage: `url(${worldMap})`,
  backgroundSize: 'cover',
}

function LetterDetailModal({ letter, cancelEvent }: LetterDetailModal) {
  const inputElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputElement.current?.focus()
  }, [])

  return (
    <div className={style.modal_overlay}>
      <div className={style.modal_overlay_window}>
        <div className={style.modal_overlay_window_title}>
          <h2>{letter.sender.name}</h2>
          <h2>➡︎</h2>
          <h2>{letter.recipient.name}</h2>
        </div>
        <div
          className={style.modal_overlay_window_content}
          style={backgroundStyle}
        >
          <div className={style.modal_overlay_window_content_group}>
            <h2>ID</h2>
            <p>{letter.id}</p>
          </div>
          <div className={style.modal_overlay_window_content_group}>
            <h2>도착시간</h2>
            <p>{letter.arrivalDate}</p>
          </div>
          <div className={style.modal_overlay_window_content_group}>
            <h2>메세지</h2>
            <p>{letter.message}</p>
          </div>
        </div>
        <div className={style.modal_overlay_window_buttons}>
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

export default LetterDetailModal
