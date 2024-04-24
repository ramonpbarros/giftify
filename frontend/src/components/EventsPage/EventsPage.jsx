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
  const eventsCurrent = useSelector((state) => state.events);
  const state = useSelector((state) => state);
  // const eventDetails = useSelector((state) => state.events.eventDetails);
  // const events = useSelector((state) => state.events);
  console.log(state)

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { eventName, eventDescription, eventDate };
    if (eventName && eventDescription && eventDate) {
      await dispatch(createNewEvent(newEvent));
      setEventName('');
      setEventDescription('');
      setEventDate('');
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
              <form onSubmit={handleSubmit}>
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
              Object.keys(eventsCurrent).map((eventId) => (
                <EventsTileComponent
                  key={eventId}
                  event={eventsCurrent[eventId]}
                  sidebarWidth={sidebarWidth}
                  onClick={() => handleEventClick(eventId)}
                />
              ))}
          </div>
        </div>
        <div className="background">
          {console.log('eventsCurrent[clickedEventId]: ', eventsCurrent[clickedEventId])}
          {eventsCurrent && (
            <>
              {clickedEventId && (
                <EventsCardComponent
                  key={clickedEventId}
                  event={eventsCurrent[clickedEventId]}
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
