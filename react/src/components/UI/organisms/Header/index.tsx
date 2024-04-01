import React, { useContext } from 'react'
import Button from '../../atoms/Button'
import styles from './style.module.scss'
import logoImage from '../../../../media/img/logo.png'
import { goToHome } from './functions'
import { Context } from '../../../../Root'

function Header() {
  const {
    isLetterWriteModal,
    setIsLetterWriteModal,
    showHamburgerMenu,
    setShowHamburgerMenu,
  } = useContext(Context)

  return (
    <header className={styles.container}>
      <div className={styles.container_logo} onClick={goToHome}>
        <img src={logoImage} alt="HMAIL" className={styles.logo} />
        HMAIL
      </div>
      <div className={styles.container_menu}>
        <div className={styles.button}>
          <Button
            btnName="편지쓰기"
            disabled={false}
            clickEvent={() => {
              setIsLetterWriteModal(!isLetterWriteModal)
            }}
          />
        </div>
        <div
          className={styles.container_menu_more}
          onClick={() => {
            setShowHamburgerMenu(!showHamburgerMenu)
          }}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </header>
  )
}

export default Header
