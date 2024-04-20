import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './EventsPage.css';
import { useEffect, useState } from 'react';
import { getAllEvents, getEventsByCurrentUser } from '../../store/events';
import EventsCardComponent from '../EventsCardComponent';
import EventsTileComponent from '../EventsTileComponent';
import { HiLogin } from 'react-icons/hi';
import { HiLogout } from 'react-icons/hi';

function EventsPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const events = useSelector((state) => state.events.eventsList.Events);
  const eventsCurrent = useSelector((state) => state.events.eventsCurr.Events);
  const [sidebarWidth, setSidebarWidth] = useState(300);

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getEventsByCurrentUser());
  }, [dispatch]);

  if (!sessionUser) return <Navigate to="/signup" replace={true} />;

  const toggleSidebarWidth = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 300 ? 40 : 300));
  };

  return (
    <>
      <div className="page">
        <div className="sidebar" style={{ width: sidebarWidth }}>
          {sidebarWidth === 300 ? (
            <div className="sidebar-header" onClick={toggleSidebarWidth}>
              <h3>My Events&nbsp;</h3> <HiLogin style={{ fontSize: '20px' }} />
            </div>
          ) : (
            <div className="sidebar-header" onClick={toggleSidebarWidth}>
              <HiLogout style={{ fontSize: '20px' }} />
            </div>
          )}
          <div className="event-tile">
            {sessionUser &&
              eventsCurrent.map((event) => (
                <EventsTileComponent
                  key={event.id}
                  event={event}
                  sidebarWidth={sidebarWidth}
                />
              ))}
          </div>
        </div>
        <div className="background">
          <div>All events</div>
          {sessionUser &&
            events.map((event) => (
              <EventsCardComponent key={event.id} event={event} />
            ))}
        </div>
      </div>
    </>
  );
}

export default EventsPage;
