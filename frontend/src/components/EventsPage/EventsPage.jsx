import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  clearEvents,
  createNewEvent,
  getEventById,
  getEventsByCurrentUser,
} from '../../store/events';
import EventsCardComponent from '../EventsCardComponent';
import EventsTileComponent from '../EventsTileComponent';
import { HiLogin } from 'react-icons/hi';
import { HiLogout } from 'react-icons/hi';
import './EventsPage.css';

function EventsPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const eventsCurrent = useSelector((state) => state.events);

  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [clickedEventId, setClickedEventId] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [maxGiftCost, setMaxGiftCost] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(clearEvents());
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
    setErrors({});

    const newEvent = {
      eventName,
      eventDescription,
      eventDate,
      imgUrl,
      maxAttendees,
      maxGiftCost,
    };

    await dispatch(createNewEvent(newEvent)).catch(async (res) => {
      const data = await res.json();
      if (data && data.message) {
        setErrors(data.errors);
      }
    });

    setEventName('');
    setEventDescription('');
    setEventDate('');
    setMaxGiftCost('');
    setMaxAttendees('');
    setImgUrl('');
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
                  placeholder={'Event Name'}
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
                <input
                  placeholder={'Description'}
                  type="text"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
                <input
                  placeholder={'Date'}
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
                <input
                  placeholder={'Max Gift Cost'}
                  type="number"
                  value={maxGiftCost}
                  onChange={(e) => setMaxGiftCost(e.target.value)}
                />
                <input
                  placeholder={'Max Attendees'}
                  type="number"
                  value={maxAttendees}
                  onChange={(e) => setMaxAttendees(e.target.value)}
                />
                <input
                  placeholder={'Image Link'}
                  type="text"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                />
                {Object.keys(errors).length > 0 && (
                  <>
                    <small className="error">{errors.eventName}</small>
                    <br />
                    <small className="error">{errors.eventDescription}</small>
                    <br />
                    <small className="error">{errors.eventDate}</small>
                  </>
                )}
                <button
                  className="edit edit-content"
                  style={{ marginLeft: 'auto' }}
                  type="submit"
                >
                  Create Event
                </button>
              </form>
              <hr />
            </>
          ) : (
            <div className="sidebar-header" onClick={toggleSidebarWidth}>
              <HiLogout style={{ fontSize: '20px' }} />
            </div>
          )}
          <div className="event-tile">
            {sessionUser &&
            eventsCurrent &&
            Object.keys(eventsCurrent).length > 0 ? (
              Object.keys(eventsCurrent).map((eventId) => {
                return (
                  <EventsTileComponent
                    key={eventId}
                    event={eventsCurrent[eventId]}
                    sidebarWidth={sidebarWidth}
                    onClick={() => handleEventClick(eventId)}
                  />
                );
              })
            ) : (
              <p
                className="no-wishlists"
                style={{ display: sidebarWidth === 40 ? 'none' : 'block' }}
              >
                You&apos;re not currently part of any events. Go ahead and
                create a new event!
              </p>
            )}
          </div>
        </div>
        <div className="background">
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
