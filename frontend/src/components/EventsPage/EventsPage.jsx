import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './EventsPage.css';
import { useEffect, useState } from 'react';
import {
  createNewEvent,
  getAllEvents,
  getEventById,
  getEventsByCurrentUser,
} from '../../store/events';
import EventsCardComponent from '../EventsCardComponent';
import EventsTileComponent from '../EventsTileComponent';
import { HiLogin } from 'react-icons/hi';
import { HiLogout } from 'react-icons/hi';

function EventsPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const eventsCurrent = useSelector((state) => state.events.eventsCurr.Events);
  const eventDetails = useSelector((state) => state.events.eventDetails);

  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [clickedEventId, setClickedEventId] = useState(null);
  const [eventName, setEventName] = useState();
  const [eventDescription, setEventDescription] = useState();
  const [eventDate, setEventDate] = useState();

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getEventsByCurrentUser());
  }, [dispatch]);

  const toggleSidebarWidth = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 300 ? 40 : 300));
  };

  const handleEventClick = (eventId) => {
    dispatch(getEventById(eventId));
    setClickedEventId(eventId);
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();

    const newEvent = { eventName, eventDescription, eventDate };
    if (eventName && eventDescription && eventDate) {
      return dispatch(createNewEvent(newEvent)).then(
        setEventName(''),
        setEventDescription(''),
        setEventDate('')
      );
    }
  };

  if (!sessionUser) return <Navigate to="/signup" replace={true} />;

  return (
    <>
      <div className="page">
        <div className="sidebar" style={{ width: sidebarWidth }}>
          {sidebarWidth === 300 ? (
            <>
              <div className="sidebar-header" onClick={toggleSidebarWidth}>
                <h3>My Events&nbsp;</h3>{' '}
                <HiLogin style={{ fontSize: '20px' }} />
              </div>
              <form onSubmit={handleCreateEvent}>
                <input
                  className="create-reward-input"
                  placeholder={'Event Name'}
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
                <input
                  className="create-reward-input"
                  placeholder={'Description'}
                  type="text"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  required
                />
                <input
                  className="create-reward-input"
                  placeholder={'Date'}
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
                <button type="submit">Create Event</button>
              </form>
            </>
          ) : (
            <div className="sidebar-header" onClick={toggleSidebarWidth}>
              <HiLogout style={{ fontSize: '20px' }} />
            </div>
          )}
          <div className="event-tile">
            {sessionUser &&
              eventsCurrent &&
              eventsCurrent.map((event) => (
                <EventsTileComponent
                  key={event.id}
                  event={event}
                  sidebarWidth={sidebarWidth}
                  onClick={() => handleEventClick(event.id)}
                />
              ))}
          </div>
        </div>
        <div className="background">
          {eventsCurrent && (
            <>
              {clickedEventId && (
                <EventsCardComponent
                  key={clickedEventId}
                  event={eventDetails[clickedEventId]}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default EventsPage;
