import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'
import Button from '../../../UI/atoms/Button'
import { useNavigate } from 'react-router-dom'
import * as maptilersdk from '@maptiler/sdk'
import {
  goToRegistConfirm,
  useMapEffect,
  updateName,
  updateEmail,
  updateStatePassword,
  checkPassword,
  goToBack,
} from './functions'
import TextInput from '../../../UI/atoms/TextInput'
import { useRecoilState } from 'recoil'
import { registAccountState } from '../../../../store/account'
import { customStyle } from './style'
import {
  showEmailValidationErrMsg,
  showInappropriatePasswordErrMsg,
  showNoEmailErrMsg,
  showNoMoveMarkerErrMsg,
  showNoNameErrMsg,
  showNoPasswordMsg,
  showPasswordNoMatchErrMsg,
} from '../../../../utils/errorMsg'

function RegistAccount() {
  const navigate = useNavigate()
  const mapContainer = useRef<HTMLDivElement>(null)
  const tokyo = { lng: 139.753, lat: 35.6844 }
  const [zoom] = useState(7)
  const map = useRef<maptilersdk.Map | null>(null)
  const [account, setAccount] = useRecoilState(registAccountState)
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordNoMatchErrorState, setPasswordNoMatchErrorState] = useState({
    isError: false,
  })
  const [isPasswordState, setPasswordState] = useState({ noPassword: false })
  const [inappropriatePasswordState, setInappropriatePasswordState] = useState({
    inappropriatePassword: false,
  })
  const [mapMarkerState, setMapMarkerState] = useState({ noMoveMarker: false })
  const [emailValidationState, setEmailValidationState] = useState({
    emailValidationErr: false,
  })
  const [emailState, setEmailState] = useState({ noEmail: false })
  const [nameState, setNameState] = useState({ noName: false })
  const [coordinate, setCoordinate] = useState([0, 0])

  useEffect(
    useMapEffect(
      account,
      tokyo,
      mapContainer,
      zoom,
      map,
      setAccount,
      setCoordinate,
      setMapMarkerState,
    ),
    [tokyo.lng, tokyo.lat, zoom],
  )

  return (
    <div className={styles.container}>
      <div style={customStyle}></div>
      <div className={styles.container_wrap}>
        <div className={styles.container_wrap_form}>
          <h1>Regist Account</h1>
          <div className={styles.container_wrap_form_inputs}>
            <div>
              <span>
                <strong>Name</strong>
              </span>
              <TextInput
                type="text"
                placeholder="Input your name"
                onChange={updateName(setAccount, setNameState)}
                value={account.name}
              />
              {showNoNameErrMsg(nameState)}
            </div>
            <div>
              <span>
                <strong>Email</strong>
              </span>
              <TextInput
                type="email"
                placeholder="Input your Email"
                onChange={updateEmail(
                  setAccount,
                  setEmailValidationState,
                  setEmailState,
                )}
                value={account.email}
              />
              {showNoEmailErrMsg(emailState)}
              {showEmailValidationErrMsg(emailValidationState)}
            </div>
            <div>
              <span>
                <strong>Password</strong>
              </span>
              <TextInput
                type="password"
                placeholder="Input password"
                onChange={updateStatePassword(
                  setPassword1,
                  setPasswordState,
                  setInappropriatePasswordState,
                )}
              />
              {showInappropriatePasswordErrMsg(inappropriatePasswordState)}
            </div>
            <div>
              <span>
                <strong>Password Confirm</strong>
              </span>
              <TextInput
                type="password"
                placeholder="Input password confirm"
                onChange={checkPassword(
                  password1,
                  setPasswordNoMatchErrorState,
                  setAccount,
                  setPassword2,
                  setPasswordState,
                )}
              />
              {showPasswordNoMatchErrMsg(passwordNoMatchErrorState)}
              {showNoPasswordMsg(isPasswordState)}
            </div>
          </div>
          <span>
            <p>
              <strong>Move the Marker to your place</strong>
            </p>
          </span>
          <div className={styles.container_wrap_form_map_wrap}>
            <div
              ref={mapContainer}
              className={styles.container_wrap_form_map_wrap_map}
            />
          </div>
          {showNoMoveMarkerErrMsg(mapMarkerState)}
          <div className={styles.container_wrap_form_btn}>
            <Button
              btnName="Confirm"
              disabled={false}
              clickEvent={() =>
                goToRegistConfirm(
                  navigate,
                  passwordNoMatchErrorState,
                  isPasswordState,
                  mapMarkerState,
                  account,
                  coordinate,
                  setAccount,
                  setPasswordState,
                  setMapMarkerState,
                  setEmailValidationState,
                  setEmailState,
                  setNameState,
                  setInappropriatePasswordState,
                )
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

export default RegistAccount
