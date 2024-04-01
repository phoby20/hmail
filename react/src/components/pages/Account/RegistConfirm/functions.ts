import { NavigateFunction } from 'react-router-dom'
import { constants } from '../../../../constants'
import { AccountInfo } from '../../../../type/account'
import { SetterOrUpdater } from 'recoil'
import { postRegistAccount } from '../../../../api/account'

const { LOCATION } = constants

export const goToRegistComplete = (
  navigate: NavigateFunction,
  account: AccountInfo,
  setAccount: SetterOrUpdater<AccountInfo>,
) => {
  postRegistAccount(navigate, account, setAccount)
}

export const goToBack = (navigate: NavigateFunction) => {
  navigate(LOCATION.PATH.REGIST_ACCOUNT)
}

export const makeTextPrivate = (password: string) => {
  return '*'.repeat(password.length)
}
