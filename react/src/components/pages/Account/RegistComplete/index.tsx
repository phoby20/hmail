import React, { useRef } from 'react'
import style from './style.module.scss'
import Button from '../../../UI/atoms/Button'
import { useNavigate } from 'react-router-dom'
import { constants } from '../../../../constants'

const { LOCATION } = constants

export function RegistComplete() {
  const videoTag = useRef<HTMLVideoElement>(null)
  const navigate = useNavigate()
  const playVideo = () => {
    return (
      <video
        src={require('../../../../media/videos/video-1.mp4')}
        ref={videoTag}
        autoPlay={true}
        controls={false}
        loop={true}
        muted={true}
      />
    )
  }

  const goTologin = () => {
    navigate(LOCATION.PATH.LOGIN)
  }

  return (
    <div className={style.container}>
      <div className={style.container_body}>
        <div className={style.container_body_wrap}>
          <h1>Membership registration completed!</h1>
          <div className={style.container_body_wrap_btn}>
            <Button btnName="Login" disabled={false} clickEvent={goTologin} />
          </div>
        </div>
      </div>
      <div className={style.background_video}>{playVideo()}</div>
    </div>
  )
}
export default RegistComplete
