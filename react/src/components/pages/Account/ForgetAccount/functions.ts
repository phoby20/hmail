import { NavigateFunction } from 'react-router-dom'
import { constants } from '../../../../constants'
import backgroundImg from '../../../../media/img/login_background.jpeg'

const { LOCATION } = constants

export const imgStyle = {
  background: `url(${backgroundImg})`,
  backgroundSize: 'cover',
  height: '100vh',
  backgroundRepeat: 'no-repeat',
  filter: 'blur(14px)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  WebkitFilter: 'blur(10px)',
  transform: 'scale(1.07)',
} as const

export const resetPassword = (navigate: NavigateFunction) => {
  navigate(LOCATION.PATH.RESET_PASSWORD)
}
