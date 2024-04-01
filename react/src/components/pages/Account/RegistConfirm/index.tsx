import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'
import Button from '../../../UI/atoms/Button'
import TextInput from '../../../UI/atoms/TextInput'
import { useNavigate } from 'react-router-dom'
import { goToRegistComplete, goToBack, makeTextPrivate } from './functions'
import { useRecoilState } from 'recoil'
import { registAccountState } from '../../../../store/account'
import * as maptilersdk from '@maptiler/sdk'
import { imgStyle } from './style'

function RegistConfirm() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [account, setAccount] = useRecoilState(registAccountState)
  const [zoom] = useState(7)
  const map = useRef<maptilersdk.Map | null>(null)
  const tokyo = { lng: 139.753, lat: 35.6844 }

  const checkCoordinate = () => {
    const [lng, lat] = account.coordinate
    if (lng === 0 && lat === 0) {
      return [tokyo.lng, tokyo.lat]
    }
    return [lng, lat]
  }
  const nowCoordinate = checkCoordinate() as [number, number]

  useEffect(() => {
    // Maptiler apikey를 불러온다
    const apiKey = process.env.REACT_APP_MAPTILER_API as string
    maptilersdk.config.apiKey = apiKey

    map.current = new maptilersdk.Map({
      container: mapContainer.current!,
      style: maptilersdk.MapStyle.OUTDOOR,
      center: nowCoordinate,
      zoom: zoom,
    })

    new maptilersdk.Marker({
      draggable: false,
    })
      .setLngLat(nowCoordinate)
      .addTo(map.current)
  }, [tokyo.lng, tokyo.lat, zoom])

  return (
    <div className={styles.container}>
      <div style={imgStyle}></div>
      <div className={styles.container_wrap}>
        <div className={styles.container_wrap_form}>
          <h1>Regist Confirm</h1>
          <div className={styles.container_wrap_form_confirm}>
            <div>
              <strong>Name</strong>
              <TextInput type="text" value={account.name} disabled={true} />
            </div>

            <div>
              <strong>Email</strong>
              <TextInput type="text" value={account.email} disabled={true} />
            </div>
            <div>
              <strong>Password</strong>
              <TextInput
                type="text"
                value={makeTextPrivate(account.password)}
                disabled={true}
              />
            </div>
            <div className={styles.container_wrap_form_map_wrap}>
              <div
                ref={mapContainer}
                className={styles.container_wrap_form_map_wrap_map}
              />
            </div>
          </div>
          <div className={styles.container_wrap_form_btn}>
            <Button
              btnName="Regist"
              disabled={false}
              clickEvent={() =>
                goToRegistComplete(navigate, account, setAccount)
              }
            />
            <Button
              btnName="Back"
              disabled={false}
              type="white"
              clickEvent={() => goToBack(navigate)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistConfirm
