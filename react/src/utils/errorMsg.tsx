export const showNoNameErrMsg = (nameState: { noName: boolean }) => {
  if (nameState.noName) {
    return (
      <div style={{ color: 'red' }}>
        Name has not been entered yet. Please enter your name.
      </div>
    )
  }
}

export const showNoEmailErrMsg = (emailState: { noEmail: boolean }) => {
  if (emailState.noEmail) {
    return (
      <div style={{ color: 'red' }}>
        Email has not been entered yet. Please enter your email.
      </div>
    )
  }
}

export const showEmailValidationErrMsg = (emailValidationState: {
  emailValidationErr: boolean
}) => {
  if (emailValidationState.emailValidationErr) {
    return (
      <div style={{ color: 'red' }}>
        Email verification failed. <br />
        please check your Email.
      </div>
    )
  }
}

export const showPasswordNoMatchErrMsg = (passwordNoMatchErrorState: {
  isError: boolean
}) => {
  if (passwordNoMatchErrorState.isError) {
    return (
      <div style={{ color: 'red' }}>
        The passwords entered do not match. Please check your password.
      </div>
    )
  }
}

export const showNoPasswordMsg = (isPasswordState: { noPassword: boolean }) => {
  if (isPasswordState.noPassword) {
    return (
      <div style={{ color: 'red' }}>
        Password not entered. Please check your password.
      </div>
    )
  }
}

export const showNoMoveMarkerErrMsg = (mapMarkerState: {
  noMoveMarker: boolean
}) => {
  if (mapMarkerState.noMoveMarker) {
    return (
      <div style={{ color: 'red' }}>
        The marker has not been moved to your position. Move the marker to your
        position.
      </div>
    )
  }
}

export const showInappropriatePasswordErrMsg = (inappropriatePasswordState: {
  inappropriatePassword: boolean
}) => {
  if (inappropriatePasswordState.inappropriatePassword) {
    return (
      <div style={{ color: 'red' }}>
        The password is formatted incorrectly. Please enter your password using
        a combination of letters, numbers, and special symbols.
      </div>
    )
  }
}
