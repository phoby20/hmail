import { useNavigate } from 'react-router-dom'
import styles from './style.module.scss'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../Root'
import { LettersResponse } from '../../../type/letter'
import { constants } from '../../../constants'
import worldMap from '../../../media/img/world_map.png'
import { fetchSendLetters } from '../../../api/letter'

const { LOCATION } = constants

const backgroundStyle = {
  backgroundImage: `url(${worldMap})`,
  backgroundSize: 'cover',
}

function SendTray() {
  const navigate = useNavigate()
  const { loggedInUser } = useContext(Context)
  const [sendLetters, setSendLetters] = useState<LettersResponse | null>(null)
  const userId = loggedInUser?.id ?? 0

  useEffect(() => {
    if (userId) {
      fetchSendLetters(userId, setSendLetters)
    } else {
      alert('로그인 유저만 이용 가능한 페이지 입니다.')
      navigate(LOCATION.PATH.LOGIN)
      return
    }
  }, [])

  const letterCard = () => {
    return sendLetters?.map((letter, index) => {
      return (
        <div className={styles.letters_wrap_letter} key={index}>
          <div className={styles.letters_wrap_letter_title}>
            <h2>{letter.sender.name}</h2>
            <h2>➡︎</h2>
            <h2>{letter.recipient.name}</h2>
          </div>
          <div
            className={styles.letters_wrap_letter_content}
            style={backgroundStyle}
          >
            <div className={styles.letters_wrap_letter_content_group}>
              <h2>ID</h2>
              <p>{letter.id}</p>
            </div>
            <div className={styles.letters_wrap_letter_content_group}>
              <h2>도착시간</h2>
              <p>{letter.arrivalDate}</p>
            </div>
            <div className={styles.letters_wrap_letter_content_group}>
              <h2>메세지</h2>
              <p>{letter.message}</p>
            </div>
          </div>
        </div>
      )
    })
  }
  return (
    <div className={styles.container}>
      <h1>보낸 편지함</h1>
      <section>
        <div className={styles.letters_wrap}>{letterCard()}</div>
      </section>
    </div>
  )
}

export default SendTray
