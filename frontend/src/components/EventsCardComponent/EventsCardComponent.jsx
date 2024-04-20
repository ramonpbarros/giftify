function EventsComponent({event}) {
  return (
    <>
      <h1>{event?.eventName}</h1>
      <p>{event?.eventDescription}</p>
      {!event?.private && (
        <p>Public</p>
      )}
    </>
  );
}

export default EventsComponent;
