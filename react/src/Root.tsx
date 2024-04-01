import { Outlet } from 'react-router-dom'
import Header from './components/UI/organisms/Header'
import Footer from './components/UI/organisms/Footer'
import { useEffect, useState } from 'react'
import React, { createContext } from 'react'
import { fetchCheckLogin } from './api/account'
import { LoggedInUser } from './type/account'
import HamburgerMenu from './components/UI/organisms/HamburgerMenu'
import styles from './style.module.scss'
import CreatLetter from './components/UI/organisms/CreatLetter'

type ContextType = {
  isLetterWriteModal: boolean
  setIsLetterWriteModal: (arg: boolean) => void
  loggedInUser: null | LoggedInUser
  showHamburgerMenu: boolean
  setShowHamburgerMenu: (arg: boolean) => void
  showCreatLetter: boolean
  setShowCreatLetter: (arg: boolean) => void
}

export const Context = createContext<ContextType>({
  isLetterWriteModal: false,
  setIsLetterWriteModal: () => {},
  loggedInUser: null,
  showHamburgerMenu: false,
  setShowHamburgerMenu: () => {},
  showCreatLetter: false,
  setShowCreatLetter: () => {},
})

const Root = () => {
  const [isLetterWriteModal, setIsLetterWriteModal] = useState<boolean>(false) // 편지쓰기 버튼 클릭 유무를 확인하는 states
  const [loggedInUser, setLoggedInUser] = useState<null | LoggedInUser>(null) // 로그인 유무를 확인하는 state
  const [isApiCallComplete, setIsApiCallComplete] = useState<boolean>(false) // 리엑트 처음 기동시에 호출하는 API가 호출이 끝났는지 확인하는 state
  const [showHamburgerMenu, setShowHamburgerMenu] = useState<boolean>(false) // 햄버거 메뉴의 클릭 유무를 확인하는 state
  const [showCreatLetter, setShowCreatLetter] = useState<boolean>(false) // 편지쓰기 모달의 온오프 유무를 확인하는 state

  useEffect(() => {
    fetchCheckLogin(setLoggedInUser, setIsApiCallComplete)
  }, [])

  return (
    <div>
      {isApiCallComplete ? (
        <Context.Provider
          value={{
            isLetterWriteModal,
            setIsLetterWriteModal,
            loggedInUser,
            showHamburgerMenu,
            setShowHamburgerMenu,
            showCreatLetter,
            setShowCreatLetter,
          }}
        >
          <Header />
          <main>
            {/* URL에 따라 변경되는 부분 */}
            <Outlet />
            {showHamburgerMenu ? (
              <div className={styles.hamburger_menu}>
                <HamburgerMenu
                  showHamburgerMenu={showHamburgerMenu}
                  setShowHamburgerMenu={setShowHamburgerMenu}
                  isAuth={loggedInUser?.id ?? 0}
                />
              </div>
            ) : (
              ''
            )}
            {isLetterWriteModal ? (
              <CreatLetter
                cancelEvent={() => {
                  setIsLetterWriteModal(!isLetterWriteModal)
                }}
              />
            ) : (
              ''
            )}
          </main>
          <Footer />
        </Context.Provider>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Root
