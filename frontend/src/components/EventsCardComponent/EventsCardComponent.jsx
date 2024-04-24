import { useSelector } from 'react-redux';
import EventAttendeesComponent from '../EventAttendeesComponent/EventAttendeesComponent';
import './EventsCardComponent.css';
import DeleteEventModal from '../DeleteEventModal/DeleteEventModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import EditEventModal from '../EditEventModal/EditEventModal';

function EventsComponent({ event }) {
  const sessionUser = useSelector((state) => state.session.user);
  const attendees = event?.Attendees;

  // console.log('event: ', event);

  const formattedDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  // const handleDelete = (eventId) => {
  //   <OpenModalButton
  //     buttonText="Delete"
  //     modalComponent={<DeleteEventModal eventId={eventId} />}
  //   />;
  // };

  return (
    <>
      <div className="event-card-current">
        <div className="event-image-current">
          {/* eventsCurrent?.[clickedEventId]?.imgUrl */}
          <img src={event.imgUrl} alt={event.eventName} />
        </div>
        <div className="event-details-current">
          <h1>{event.eventName}</h1>
          {event?.Organizer?.username === sessionUser.username && (
            <div className="event-btns">
              {/* <button className="edit edit-content">Edit</button> */}
              {/* <button
                className="delete delete-content"
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </button> */}
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
            {event?.eventDate ? formattedDate(event.eventDate) : 'No date'}
          </p>
          <p>
            <strong>Description: </strong>
            {event?.eventDescription}
          </p>
          <p>
            <strong>Organizer: </strong>
            {event?.Organizer?.username}
          </p>
          <p>
            <strong>Max Attendees: </strong>
            {event?.maxAttendees} people
          </p>
          <p>
            <strong>Max Gift Cost: </strong>${event?.maxGiftCost}
          </p>
        </div>
      </div>
      <EventAttendeesComponent attendees={attendees} event={event} />
    </>
  );
}

export default EventsComponent;
