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
            {event && event.imgUrl ? (
              <img src={event?.imgUrl} alt={event?.eventName} />
            ) : (
              <img
                src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1714153082/Giftify_jvtlqv.png"
                alt={event?.eventName}
              />
            )}
          </div>
          <div className="open-modal-details">
            <h1>{event?.eventName}</h1>
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
