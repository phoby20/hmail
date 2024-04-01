import { useNavigate } from 'react-router-dom'
import { constants } from '../../../../constants'
import Button from '../../atoms/Button'
import styles from './style.module.scss'
import { goToLogin, goToLogout, transitionPage } from './functions'

type HamburgerMenuType = {
  showHamburgerMenu: boolean
  setShowHamburgerMenu: (arg: boolean) => void
  isAuth: number
}

const { ROUTE_NAME } = constants.LOCATION
const { CLICK_NUMBER } = constants.MENU

function HamburgerMenu({
  showHamburgerMenu,
  setShowHamburgerMenu,
  isAuth,
}: HamburgerMenuType) {
  const navigate = useNavigate()

  // 로그아웃 버튼를 표시 할지 말지를 정함
  const loginComponent = () => {
    return (
      <div className={styles.button}>
        <Button
          btnName={ROUTE_NAME.LOGIN}
          disabled={false}
          clickEvent={() => goToLogin(navigate)}
        />
      </div>
    )
  }
  const logoutComponent = () => {
    return (
      <div className={styles.button}>
        <Button
          btnName={ROUTE_NAME.LOGOUT}
          type="white"
          disabled={false}
          clickEvent={goToLogout}
        />
      </div>
    )
  }
  return (
    <div className={styles.hamburgermenu}>
      <div
        className={styles.hamburgermenu_back}
        onClick={() => {
          setShowHamburgerMenu(!showHamburgerMenu)
        }}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </div>
      <div className={styles.hamburgermenu_wrap}>
        <div className={styles.hamburgermenu_wrap_detail}>
          <ul>
            <li
              onClick={() =>
                transitionPage(
                  CLICK_NUMBER.RECEIVING_TRAY,
                  navigate,
                  setShowHamburgerMenu,
                  showHamburgerMenu,
                )
              }
            >
              <i className="fa-regular fa-envelope"></i> 받은 편지함
            </li>
            <li
              onClick={() =>
                transitionPage(
                  CLICK_NUMBER.SEND_TRAY,
                  navigate,
                  setShowHamburgerMenu,
                  showHamburgerMenu,
                )
              }
            >
              <i className="fa-regular fa-paper-plane"></i> 보낸 편지함
            </li>
          </ul>
        </div>
        {isAuth ? logoutComponent() : loginComponent()}
      </div>
    </div>
  )
}

export default HamburgerMenu
