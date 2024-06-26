import { useSelector } from 'react-redux';
import EventAttendeesComponent from '../EventAttendeesComponent/EventAttendeesComponent';
import './EventsCardComponent.css';
import DeleteEventModal from '../DeleteEventModal/DeleteEventModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import EditEventModal from '../EditEventModal/EditEventModal';

function EventsCardComponent({ event }) {
  const sessionUser = useSelector((state) => state.session.user);
  const attendees = event?.Attendees;

  const formattedDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <div>
      {event && (
        <>
          <div className="event-card-current">
            <div className="event-image-current">
              {event.imgUrl ? (
                <img src={event.imgUrl} alt={event.eventName} />
              ) : (
                <img
                  src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1714153082/Giftify_jvtlqv.png"
                  alt={event.eventName}
                />
              )}
            </div>
            <div className="event-details-current">
              <h1>{event.eventName}</h1>
              {event.Organizer?.username === sessionUser.username && (
                <div className="event-btns">
                  <OpenModalButton
                    buttonText="Edit"
                    modalComponent={<EditEventModal event={event} />}
                  />
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteEventModal eventId={event.id} />}
                  />
                </div>
              )}

              <p>
                <strong>Date: </strong>
                {event.eventDate ? formattedDate(event.eventDate) : 'No date'}
              </p>
              <p>
                <strong>Description: </strong>
                {event.eventDescription}
              </p>
              <p>
                <strong>Organizer: </strong>
                {event.Organizer?.username}
              </p>
              <p>
                <strong>Max Attendees: </strong>
                {event.maxAttendees} people
              </p>
              <p>
                <strong>Max Gift Cost: </strong>${event.maxGiftCost}
              </p>
            </div>
          </div>
          <EventAttendeesComponent attendees={attendees} event={event} />
        </>
      )}
    </div>
  );
}

export default EventsCardComponent;
