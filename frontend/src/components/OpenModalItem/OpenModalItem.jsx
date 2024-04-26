import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './OpenModalItem.css';
import { clearAttendees } from '../../store/attendees';

function OpenModalButton({
  modalComponent,
  event,
  onClickEvent,
  onModalClose,
}) {
  const dispatch = useDispatch();
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    dispatch(clearAttendees());
    setModalContent(modalComponent);
    if (typeof onClickEvent === 'function') onClickEvent(event.id);
  };

  return (
    <>
      <div className="open-modal-container" onClick={onClick}>
        <div className="open-modal-card">
          <div className="open-modal-image">
            <img src={event?.imgUrl} alt={event?.eventName} />
          </div>
          <div className="open-modal-details">
            <h1>{event?.eventName}</h1>
            {/* <p>
              <strong>Description: </strong>
              {event?.eventDescription}
            </p> */}
            {event?.User?.firstName && event?.User?.lastName ? (
              <p>
                <strong>Organizer: </strong>
                {event?.User?.firstName} {event?.User?.lastName}
              </p>
            ) : (
              <p>
                <strong>Organizer: </strong>
                {event?.User?.username}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OpenModalButton;
