import { postRegistLetter } from '../../../../api/letter'
import { checkNoInputText } from '../../../../utils/validate'

export const sendLetter = async (
  inputText: string,
  maxTextLengthErr: boolean,
  showLetterModal: boolean,
  setShowLetterModal: (arg: boolean) => void,
  setNoInputErr: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const isNoInput = checkNoInputText(inputText)
  setNoInputErr(isNoInput)

  if (!isNoInput && !maxTextLengthErr) {
    const letterMessage = {
      message: inputText,
    }
    // 여기서 API를 호출한다
    await postRegistLetter(letterMessage)
    setShowLetterModal(!showLetterModal)
  }
}
