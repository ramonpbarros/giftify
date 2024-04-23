import EventAttendeesComponent from '../EventAttendeesComponent/EventAttendeesComponent';
import './EventsCardComponent.css';

function EventsComponent({ event }) {
  const attendees = event?.Attendees;

  const formattedDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <>
      <div className="event-card-current">
        <div className="event-image-current">
          <img src={event?.imgUrl} alt={event?.eventName} />
        </div>
        <div className="event-details-current">
          <h1>{event?.eventName}</h1>
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
      <EventAttendeesComponent attendees={attendees} event={event}/>
    </>
  );
}

export default EventsComponent;
