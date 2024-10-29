import SvgIcon from '@components/reusables/SvgIcon'
import './styles/_Modal.scss'

interface ModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>
  modalHeaderText : string;
  modalDesc : string;
  children : React.ReactNode;
}
export default function Modal({onClose , modalHeaderText , modalDesc , children} : ModalProps) {
  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="modal-overlay">
        <header className="modal-header">
          <h2>{modalHeaderText}</h2>
          <div className="modal-close-button" onClick={() => onClose(false)}>
            <SvgIcon path={"close-modal"}/>
          </div>
        </header>
        <div className="modal-desc">
          <p>{modalDesc}</p>
        </div>
        {children}
      </div>
    </>
  )
}
