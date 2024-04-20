import './EventsTileComponent.css';

function EventsTileComponent({ event, sidebarWidth }) {
  const maxDescriptionLength = 35;

  const truncateDescription = (description) => {
    if (description.length > maxDescriptionLength) {
      return description.substring(0, maxDescriptionLength) + '...';
    }
    return description;
  };

  return (
    <div className="event-card">
      <div
        className="event-image"
        style={{
          backgroundImage: `url(${event.imgUrl})`,
          backgroundSize: 'cover',
          // width: sidebarWidth == 50 ? '30px' : '250px'
        }}
      >
      </div>
      <div
        className="event-details"
        style={{ display: sidebarWidth == 50 ? 'none' : '' }}
      >
        <strong>{event?.eventName}</strong>
        <p>{truncateDescription(event?.eventDescription)}</p>
      </div>
    </div>
  );
}

export default EventsTileComponent;
