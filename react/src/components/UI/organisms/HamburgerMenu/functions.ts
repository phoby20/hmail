import { NavigateFunction } from 'react-router-dom'
import { constants } from '../../../../constants'
import { fetchLogout } from '../../../../api/account'

const { PATH } = constants.LOCATION
const { CLICK_NUMBER } = constants.MENU

// 로그인 버튼을 눌렀을 시 화면 전환
export const goToLogin = (navigate: NavigateFunction) => {
  navigate(PATH.LOGIN)
}

// 로그아웃 버튼을 눌렀을 시
export const goToLogout = async () => {
  fetchLogout()
}

export const transitionPage = (
  clickPageNum: number,
  navigate: NavigateFunction,
  setShowHamburgerMenu: (arg: boolean) => void,
  showHamburgerMenu: boolean,
) => {
  console.log('pageNum', clickPageNum)
  switch (clickPageNum) {
    case CLICK_NUMBER.RECEIVING_TRAY:
      setShowHamburgerMenu(!showHamburgerMenu)
      navigate(PATH.RECEIVING_TRAY)
      return
    case CLICK_NUMBER.SEND_TRAY:
      setShowHamburgerMenu(!showHamburgerMenu)
      navigate(PATH.SEND_TRAY)
      return
    default:
      return
  }
}
