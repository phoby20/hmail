import { useContext, useState } from 'react'
import Modal from '../../molecules/Modal'
import { Context } from '../../../../Root'
import { sendLetter } from './functions'

type CreatLetterType = {
  cancelEvent: () => void
}

function CreatLetter({ cancelEvent }: CreatLetterType) {
  const { isLetterWriteModal, setIsLetterWriteModal } = useContext(Context)
  const [maxTextLengthErr, setMaxTextLengthErr] = useState(false)
  const [noInputErr, setNoInputErr] = useState(false)
  return (
    <div>
      <Modal
        maxTextLengthErr={maxTextLengthErr}
        noInputErr={noInputErr}
        sendEvent={(inputText: string) => {
          sendLetter(
            inputText,
            maxTextLengthErr,
            isLetterWriteModal,
            setIsLetterWriteModal,
            setNoInputErr,
          )
        }}
        setMaxTextLengthErr={setMaxTextLengthErr}
        setNoInputErr={setNoInputErr}
        cancelEvent={cancelEvent}
      />
    </div>
  )
}

export default CreatLetter
