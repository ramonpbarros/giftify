import './EventsTileComponent.css';

function EventsTileComponent({ event, sidebarWidth, onClick }) {
  return (
    <div className="event-card" onClick={onClick}>
      <div
        className="event-image"
        style={{
          backgroundImage: `url(${event.imgUrl})`,
          backgroundSize: 'cover',
        }}
      >
        {sidebarWidth == 40 ? (
          <img src={event.imgUrl} alt={event.eventName} />
        ) : null}
      </div>
      <div
        className="event-details"
        style={{ display: sidebarWidth == 40 ? 'none' : 'block' }}
      >
        <strong>{event?.eventName}</strong>
      </div>
    </div>
  );
}

export default EventsTileComponent;
