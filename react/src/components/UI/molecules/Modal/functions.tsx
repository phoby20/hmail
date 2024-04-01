export const showMaxTextLengthErr = () => {
  return <p>글자 수를 200자 이하로 조정해 주세요</p>
}

export const showNoInputErr = () => {
  return <p>최소 한글자 이상을 입력해야 편지를 보낼 수 있습니다.</p>
}

export const handleInputEvent = (
  e: React.FormEvent<HTMLDivElement>,
  MAX_LENGTH: number,
  setInputText: React.Dispatch<React.SetStateAction<string>>,
  setMaxTextLengthErr: React.Dispatch<React.SetStateAction<boolean>>,
  setNoInputErr: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const newValue = e.currentTarget.innerText
  newValue ? setNoInputErr(false) : setNoInputErr(true)
  const isLengthExceeding = newValue.length >= MAX_LENGTH
  if (isLengthExceeding) {
    setMaxTextLengthErr(true)
  } else {
    setMaxTextLengthErr(false)
  }
  setInputText(newValue)
}
