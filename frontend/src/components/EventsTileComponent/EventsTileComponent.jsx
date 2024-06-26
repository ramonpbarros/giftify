import './EventsTileComponent.css';

function EventsTileComponent({ event, sidebarWidth, onClick }) {
  return (
    <div className="event-card" onClick={onClick}>
      {event && event.imgUrl ? (
        <div
          className="event-image"
          style={{
            backgroundImage: `url(${event.imgUrl})`,
            backgroundSize: 'cover',
          }}
        >
          {sidebarWidth == 40 && (
            <img src={event.imgUrl} alt={event.eventName} />
          )}
        </div>
      ) : (
        <div
          className="event-image"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/drv1e8rjp/image/upload/v1714153082/Giftify_jvtlqv.png')`,
            backgroundSize: 'cover',
          }}
        >
          {sidebarWidth == 40 && (
            <img
              src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1714153082/Giftify_jvtlqv.png"
              alt={event.eventName}
            />
          )}
        </div>
      )}

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
