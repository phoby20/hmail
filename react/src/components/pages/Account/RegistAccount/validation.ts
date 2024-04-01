import { AccountInfo } from '../../../../type/account'
import { checkValidEmail, checkValidPassword } from '../../../../utils/validate'

// check account info with Empty
export const checkEmptyValues = (
  accountInfo: AccountInfo,
  setPasswordState: React.Dispatch<
    React.SetStateAction<{
      noPassword: boolean
    }>
  >,
  setMapMarkerState: React.Dispatch<
    React.SetStateAction<{
      noMoveMarker: boolean
    }>
  >,
) => {
  let isEmpty = false
  Object.entries(accountInfo).map(([keys, value]) => {
    if (Array.isArray(value)) {
      const result = value[0] === 0 || value[1] === 0
      isEmpty = result
      if (result) {
        setMapMarkerState((prevState) => {
          return Object.assign({ ...prevState }, { noMoveMarker: true })
        })
      }
    }
    if (accountInfo.password === '') {
      isEmpty = accountInfo.password === ''
      setPasswordState((preveState) => {
        return Object.assign({ ...preveState }, { noPassword: true })
      })
    }
  })
  return isEmpty
}

export const checkValidation = (
  accountInfo: AccountInfo,
  setEmailValidationState: React.Dispatch<
    React.SetStateAction<{
      emailValidationErr: boolean
    }>
  >,
  setEmailState: React.Dispatch<
    React.SetStateAction<{
      noEmail: boolean
    }>
  >,
  setNameState: React.Dispatch<
    React.SetStateAction<{
      noName: boolean
    }>
  >,
  setInappropriatePasswordState: React.Dispatch<
    React.SetStateAction<{
      inappropriatePassword: boolean
    }>
  >,
) => {
  let isValidationError = false
  Object.entries(accountInfo).map(([key, value]) => {
    if (key === 'name' && value === '') {
      isValidationError = true
      setNameState((preveState) => {
        return Object.assign({ ...preveState }, { noName: true })
      })
    }
    if (key === 'email') {
      if (value === '') {
        setEmailState((preveState) => {
          return Object.assign({ ...preveState }, { noEmail: true })
        })
        isValidationError = true
      }
      const isValidEmail = checkValidEmail(value as string)
      setEmailValidationState((preveState) => {
        return Object.assign(
          { ...preveState },
          { emailValidationErr: !isValidEmail },
        )
      })
      isValidationError = !isValidEmail
    }
    if (key === 'password') {
      const isValidPassword = checkValidPassword(value as string)
      isValidationError = !isValidPassword
      setInappropriatePasswordState((preveState) => {
        return Object.assign(
          { ...preveState },
          { inappropriatePassword: !isValidPassword },
        )
      })
    }
  })
  return isValidationError
}
