import { NavigateFunction } from 'react-router-dom'
import { constants } from '../../../../constants'

const { PATH } = constants.LOCATION

export const goToHome = () => {
  window.location.href = PATH.HOME
}
