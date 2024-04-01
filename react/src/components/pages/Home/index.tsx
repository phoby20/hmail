import MainMap from '../../UI/organisms/MainMap'
import LetterDetailModal from '../../UI/molecules/LetterDetailModal/index'
import React, { useEffect, useState } from 'react'
import { fetchLetter, fetchLetters } from '../../../api/letter'
import { LettersResponse, LetterDetail } from '../../../type/letter'
import { constants } from '../../../constants/index'
import { useLocation, useNavigate } from 'react-router-dom'

const { ALL_LETTER_MAX_MILLI_SECOND } = constants

function Home() {
  const navigate = useNavigate()
  const [letterDetail, setLetterDetail] = useState<LetterDetail | null>(null)
  const [selectedletterId, setSelectedLetterId] = useState<number>(0)
  const [letters, setLetters] = useState<LettersResponse>([])
  const [isCalledApi, setIsCallApi] = useState(false)
  const location = useLocation()

  // 편지를 클릭 했을 때 실행
  const clickLetter = (letter: LetterDetail) => {
    setLetterDetail(letter)
    setSelectedLetterId(letter.id)
    navigate(`?id=${letter.id}`)
  }

  useEffect(() => {
    fetchLetters(setLetters, setIsCallApi)

    // URL에 letterId를 직접 적었을 경우 편지 상세 모달이 표시되게끔 함
    const queryParams = new URLSearchParams(location.search)
    const letterId = Number(queryParams.get('id')) ?? 0
    setSelectedLetterId(letterId)
    fetchLetter(letterId, setLetterDetail)

    // 10분 단위로 모든 편지를 다시 불러온다
    const intervalId = setInterval(() => {
      setIsCallApi(false)
      fetchLetters(setLetters, setIsCallApi)
    }, ALL_LETTER_MAX_MILLI_SECOND)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div>
      {isCalledApi ? (
        <MainMap letters={letters} clickLetter={clickLetter} />
      ) : (
        <div></div>
      )}

      {letterDetail && selectedletterId ? (
        <LetterDetailModal
          letter={letterDetail}
          cancelEvent={() => {
            setLetterDetail(null)
            navigate('/')
          }}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default Home
