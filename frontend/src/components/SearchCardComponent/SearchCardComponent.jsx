import { useEffect } from 'react';
import './SearchCardComponent.css';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';

import {
  getAllAttendeesByEventId,
  requestNewAttendance,
} from '../../store/attendees';

function SearchCardComponent({ event, eventId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const attendees = useSelector((state) => state.attendees);
  const sessionUser = useSelector((state) => state.session.user);
  const isAttendee = Object.values(attendees).some(
    (attendee) => attendee.username === sessionUser.username
  );

  useEffect(() => {
    if (eventId) {
      dispatch(getAllAttendeesByEventId(eventId));
    }
  }, [dispatch, eventId]);

  const formattedDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  const handleOnClick = () => {
    dispatch(requestNewAttendance()).then(closeModal);
  };

  return (
    <>
      <div className="search-container">
        <div className="search-card">
          <div className="search-image">
            <img src={event?.imgUrl} alt={event?.eventName} />
          </div>
          <div className="search-details">
            <h1>{event?.eventName}</h1>
            <p>
              <strong>Date: </strong>
              {event?.eventDate ? formattedDate(event?.eventDate) : 'No date'}
            </p>
            <p>
              <strong>Description: </strong>
              {event?.eventDescription}
            </p>
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
            <p>
              <strong>Max Attendees: </strong>
              {event?.maxAttendees} people
            </p>
            <p>
              <strong>Max Gift Cost: </strong>${event?.maxGiftCost}
            </p>
            {!isAttendee && (
              <button className="btn btn-content" onClick={handleOnClick}>
                Request Attendance
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchCardComponent;
