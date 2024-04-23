import './EventsTileComponent.css';

function EventsTileComponent({ event, sidebarWidth, onClick }) {
  const maxDescriptionLength = 80;

  const truncateDescription = (description) => {
    if (description.length > maxDescriptionLength) {
      return description.substring(0, maxDescriptionLength) + '...';
    }
    return description;
  };

  return (
    <div className="event-card" onClick={onClick}>
      <div className="event-image">
        <img src={event.imgUrl} alt={event.eventName} />
      </div>
      <div
        className="event-details"
        style={{ display: sidebarWidth == 40 ? 'none' : '' }}
      >
        <strong>{event?.eventName}</strong>
        <p>{truncateDescription(event?.eventDescription)}</p>
      </div>
    </div>
  );
}

export default EventsTileComponent;
