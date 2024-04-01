// Check Email type
// Not Email type: false
export const checkValidEmail = (email: string) => {
  // 이메일 형식을 검증하는 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(String(email).toLowerCase())
}

export const checkValidPassword = (password: string): boolean => {
  // 8자리 이상
  const hasMinimumLength = password.length >= 8

  // 알파벳과 숫자의 조합
  const hasAlphaNumeric = /[a-zA-Z]/.test(password) && /[0-9]/.test(password)

  // 특수문자 포함 여부
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return hasMinimumLength && hasAlphaNumeric && hasSpecialCharacter
}

/**
 * 입력된 텍스트가 0보다 큰지 확인
 * @param text
 * @returns 아무런 입력이 없다면 true
 */
export const checkNoInputText = (text: string) => {
  return text.length <= 0
}
