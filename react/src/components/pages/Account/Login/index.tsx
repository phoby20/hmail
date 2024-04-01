import React, { useState } from 'react'
import styles from './style.module.scss'
import Button from '../../../UI/atoms/Button'
import { Link } from 'react-router-dom'
import { processLogin, updateEmail, updatePassword } from './functions'
import { constants } from '../../../../constants'
import TextInput from '../../../UI/atoms/TextInput'
import { imgStyle } from './style'
import {
  showEmailValidationErrMsg,
  showNoEmailErrMsg,
} from '../../../../utils/errorMsg'

const { LOCATION } = constants

function Login() {
  const [emailState, setEmailState] = useState('')
  const [passwordState, setPasswordState] = useState('')
  const [emailErrorState, setEmailErrorState] = useState({
    emailValidationErr: false,
  })
  const [noEnteredEmailState, setNoEnteredEmailState] = useState({
    noEmail: false,
  })

  return (
    <div className={styles.container}>
      <div style={imgStyle}></div>
      <div className={styles.container_wrap}>
        <div className={styles.container_wrap_form}>
          <h1>{LOCATION.ROUTE_NAME.LOGIN}</h1>
          <div className={styles.container_wrap_form_inputs}>
            <TextInput
              type="email"
              placeholder="Email"
              onChange={updateEmail(
                setEmailState,
                setEmailErrorState,
                setNoEnteredEmailState,
              )}
            />
            {showEmailValidationErrMsg(emailErrorState)}
            {showNoEmailErrMsg(noEnteredEmailState)}
            <TextInput
              type="password"
              placeholder="password"
              onChange={updatePassword(setPasswordState)}
            />
          </div>
          <Link to={LOCATION.PATH.FORGET_PASSWORD}>Forget Password</Link>
          <div className={styles.container_wrap_form_btn}>
            <Button
              btnName={LOCATION.ROUTE_NAME.LOGIN}
              disabled={false}
              clickEvent={() =>
                processLogin(
                  emailState,
                  passwordState,
                  setEmailErrorState,
                  setNoEnteredEmailState,
                )
              }
            />
          </div>
          <div className={styles.create_account}>
            <Link to={LOCATION.PATH.REGIST_ACCOUNT}>Regist your Account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
