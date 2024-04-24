import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

import './DeleteEventModal.css';
import { removeEvent } from '../../store/events';

function DeleteEventModal({ eventId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await dispatch(removeEvent(eventId));
      closeModal();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  return (
    <>
      <div className="modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this event?</p>
        <div className="btns">
          <button className="confirm-delete-btn" onClick={handleDelete}>
            Yes (Delete Event)
          </button>
          <button className="dont-delete-btn" onClick={closeModal}>
            No (Keep Event)
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteEventModal;
