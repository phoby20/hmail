import React from 'react'
import styles from './style.module.scss'
import Button from '../../../UI/atoms/Button'
import { useNavigate } from 'react-router-dom'
import { imgStyle, resetPassword } from './functions'
import TextInput from '../../../UI/atoms/TextInput'

function ForgetPassword() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div style={imgStyle}></div>
      <div className={styles.container_wrap}>
        <div className={styles.container_wrap_form}>
          <h1>Forget Password</h1>
          <div className={styles.container_wrap_form_inputs}>
            <TextInput
              type="text"
              placeholder="first name"
              onChange={() => {}}
            />
            <TextInput
              type="text"
              placeholder="last name"
              onChange={() => {}}
            />
            <TextInput type="email" placeholder="Email" onChange={() => {}} />
          </div>
          <div className={styles.container_wrap_form_btn}>
            <Button
              btnName="Password Reset"
              disabled={false}
              clickEvent={() => resetPassword(navigate)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
