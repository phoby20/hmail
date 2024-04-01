import axios from 'axios'
import { constants } from '../../constants'
import { defineErrorHandler } from '../../plugins/AxiosPlugin'
import { API_STATUS } from '../../constants/apiStatus'
import { LetterDetail, LettersResponse } from '../../type/letter'

type LetterMessage = {
  message: string
}

const { LOCATION, API_URL } = constants

/**
 * 신규 편지쓰기
 * @param letterMessage
 * @param setSentLetterId 편지를 보낸 후 편지 상세 모달을 띄우기 위한 set함수
 */
export const postRegistLetter = async (letterMessage: LetterMessage) => {
  await axios
    .post<LetterMessage, { data: { id: number } }>(
      API_URL.PATH.REGIST_LETTER,
      letterMessage,
    )
    .then(({ data }) => {
      window.location.href = `/?id=${data.id}`
    })
    .catch((err) => {
      const errorStatus = err.response.status
      if (errorStatus === API_STATUS.UNAUTHORIZED) {
        window.location.href = LOCATION.PATH.LOGIN
      }
      const errConstant = defineErrorHandler(errorStatus)
      alert(errConstant)
      return
    })
}

/**
 * 탑 페이지에 보이는 편지를 취득
 */
export const fetchLetters = async (
  setLetters: React.Dispatch<React.SetStateAction<LettersResponse>>,
  setIsCallApi: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  await axios
    .get<LettersResponse>(API_URL.PATH.FETCH_LETTERS)
    .then(({ data }) => {
      setLetters(data)
      setIsCallApi(true)
      return
    })
    .catch((err) => {
      if (!err.response?.status) return err
      const errorStatus = err.response.status
      const errConstant = defineErrorHandler(errorStatus)
      alert(errConstant)
      return
    })
}

/**
 * 받은 편지함 취득하기
 * @param userId
 * @param setReceivingLetters
 */
export const fetchReceivingLetters = async (
  userId: number,
  setReceivingLetters: React.Dispatch<
    React.SetStateAction<LettersResponse | null>
  >,
) => {
  const apiUrl = API_URL.PATH.RECEIVING_LETTERS.replace(
    ':loggedInUserId',
    String(userId),
  )
  await axios
    .get<LettersResponse>(apiUrl)
    .then(({ data }) => {
      setReceivingLetters(data)
      return
    })
    .catch((err) => {
      if (!err.response?.status) return err
      const errorStatus = err.response.status
      const errConstant = defineErrorHandler(errorStatus)
      alert(errConstant)
      return
    })
}

/**
 * 보낸 편지함 취득하기
 * @param userId
 * @param setSendLetters
 */
export const fetchSendLetters = async (
  userId: number,
  setSendLetters: React.Dispatch<React.SetStateAction<LettersResponse | null>>,
) => {
  const apiUrl = API_URL.PATH.SEND_LETTERS.replace(
    ':loggedInUserId',
    String(userId),
  )
  await axios
    .get<LettersResponse>(apiUrl)
    .then(({ data }) => {
      setSendLetters(data)
      return
    })
    .catch((err) => {
      if (!err.response?.status) return err
      const errorStatus = err.response.status
      const errConstant = defineErrorHandler(errorStatus)
      alert(errConstant)
      return
    })
}

// 편지를 클릭했을 때, 혹은 URL을 직접 때렸을 때 호출
export const fetchLetter = async (
  letterId: number,
  setLetterDetail: React.Dispatch<React.SetStateAction<LetterDetail | null>>,
) => {
  await axios
    .get<LetterDetail>(API_URL.PATH.LETTER_DETAIL, {
      params: {
        letterId,
      },
    })
    .then(({ data }) => {
      setLetterDetail(data)
      return
    })
    .catch((err) => {
      if (!err.response?.status) return err
      const errorStatus = err.response.status
      const errConstant = defineErrorHandler(errorStatus)
      alert(errConstant)
      return
    })
}
