import axios from 'axios'
import {
  AccountInfo,
  ApiError,
  LoginInfo,
  LoggedInUser,
} from '../../type/account'
import { defineErrorHandler } from '../../plugins/AxiosPlugin'
import { NavigateFunction } from 'react-router-dom'
import { constants } from '../../constants'
import { SetterOrUpdater } from 'recoil'
import { defaultAccount } from '../../store/account'
import { API_STATUS } from '../../constants/apiStatus'

const { LOCATION, API_URL } = constants

/**
 * account regist
 * @param account
 */
export const postRegistAccount = async (
  navigate: NavigateFunction,
  account: AccountInfo,
  setAccount: SetterOrUpdater<AccountInfo>,
) => {
  await axios
    .post(API_URL.PATH.REGIST_ACCOUNT, account)
    .then(() => {
      initAccount(setAccount)
      navigate(LOCATION.PATH.REGIST_COMPLETE)
      return
    })
    .catch((err) => {
      const errorStatus = err.response.status
      const errConstant = defineErrorHandler(errorStatus)
      alert(errConstant)
      return
    })
}

export const fetchCheckLogin = async (
  setLoggedInUser: React.Dispatch<React.SetStateAction<null | LoggedInUser>>,
  setIsApiCallComplete: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsApiCallComplete(false)
  await axios
    .get(API_URL.PATH.LOGIN_CHECK)
    .then(({ data }) => {
      setLoggedInUser(data)
      setIsApiCallComplete(true)
    })
    .catch((err) => {
      const errorStatus = err.response.status
      if (errorStatus === API_STATUS.UNAUTHORIZED) return
      const errConstant = defineErrorHandler(errorStatus)
      setIsApiCallComplete(true)
      alert(errConstant)
      return
    })
}

export const fetchLogin = async (loginInfo: LoginInfo) => {
  await axios
    .post<LoginInfo>(API_URL.PATH.LOGIN, loginInfo)
    .then(() => {
      window.location.href = LOCATION.PATH.HOME
    })
    .catch((err: ApiError) => {
      const errorStatus = err.response.status
      const errConstant = defineErrorHandler(errorStatus)
      alert(errConstant)
      return
    })
}

export const fetchLogout = async () => {
  await axios
    .post(API_URL.PATH.LOGOUT)
    .then(() => {
      window.location.href = LOCATION.PATH.HOME
    })
    .catch((err: ApiError) => {
      const errorStatus = err.response.status
      const errConstant = defineErrorHandler(errorStatus)
      alert(errConstant)
      return
    })
}

// Reset input information
const initAccount = (setAccount: SetterOrUpdater<AccountInfo>) => {
  setAccount((preveState) => {
    return Object.assign({ ...preveState }, defaultAccount)
  })
}
