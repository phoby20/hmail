import { NavigateFunction } from 'react-router-dom'
import { constants } from '../../../../constants'
import { checkValidEmail } from '../../../../utils/validate'
import { fetchLogin } from '../../../../api/account'

const { LOCATION } = constants

export const updateEmail =
  (
    setEmailState: React.Dispatch<React.SetStateAction<string>>,
    setEmailErrorState: React.Dispatch<
      React.SetStateAction<{
        emailValidationErr: boolean
      }>
    >,
    setNoEnteredEmailState: React.Dispatch<
      React.SetStateAction<{
        noEmail: boolean
      }>
    >,
  ) =>
  (e: string) => {
    setNoEnteredEmailState({ noEmail: false })
    setEmailErrorState({ emailValidationErr: false })
    setEmailState(e)
  }

export const updatePassword =
  (setEmailState: React.Dispatch<React.SetStateAction<string>>) =>
  (e: string) => {
    setEmailState(e)
  }

export const processLogin = async (
  emailState: string,
  passwordState: string,
  setEmailErrorState: React.Dispatch<
    React.SetStateAction<{
      emailValidationErr: boolean
    }>
  >,
  setNoEnteredEmailState: React.Dispatch<
    React.SetStateAction<{
      noEmail: boolean
    }>
  >,
) => {
  const isError = checkValidate(
    emailState,
    setEmailErrorState,
    setNoEnteredEmailState,
  )
  if (!isError) {
    const loginInfo = {
      email: emailState,
      password: passwordState,
    }
    await fetchLogin(loginInfo)
  }
}

const checkValidate = (
  email: string,
  setEmailErrorState: React.Dispatch<
    React.SetStateAction<{
      emailValidationErr: boolean
    }>
  >,
  setNoEnteredEmailState: React.Dispatch<
    React.SetStateAction<{
      noEmail: boolean
    }>
  >,
) => {
  const isNoEnteredEmail = email === ''
  let isEmailValidate = false
  if (isNoEnteredEmail) {
    setNoEnteredEmailState({ noEmail: isNoEnteredEmail })
  } else {
    isEmailValidate = !checkValidEmail(email)
    setEmailErrorState({ emailValidationErr: isEmailValidate })
  }

  return isEmailValidate || isNoEnteredEmail
}
