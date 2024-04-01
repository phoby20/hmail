import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { constants } from '../../../../constants'

const { LOCATION } = constants

function ResetPassword() {
  const navigate = useNavigate()

  useEffect(() => {
    const timeId = setTimeout(() => {
      navigate(LOCATION.PATH.LOGIN)
    }, 10000)
    return () => {
      clearTimeout(timeId)
    }
  })
  return (
    <div>
      <p>Reseted password</p>
      <p>Please check your email.</p>
      <p>redirect to login page after 10 sec.</p>
    </div>
  )
}

export default ResetPassword
