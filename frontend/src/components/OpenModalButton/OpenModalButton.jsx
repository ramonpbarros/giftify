import { useModal } from '../../context/Modal';
import './OpenModalButton.css';

function OpenModalButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === 'function') onButtonClick();
  };

  return (
    <button
      className={
        buttonText === 'Delete' ? 'delete delete-content' : 'edit edit-content'
      }
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
