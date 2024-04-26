import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../store/events';
import SearchCardComponent from '../SearchCardComponent';
import './AllEventsPage.css';
import OpenModalItem from '../OpenModalItem';

const AllEventsPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const events = useSelector((state) => state.events);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    const eventsArray = Object.values(events);

    const filtered = eventsArray.filter((event) =>
      event?.eventName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (!sessionUser) return <Navigate to="/signup" replace={true} />;

  return (
    <>
      <div className="search-event-container">
        <div className="input-search">
          <input
            type="text"
            placeholder="&#128270; Search by event name"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <div className="search-event">
          {filteredEvents.map((event) => (
            <OpenModalItem
              key={event.id}
              event={event}
              modalComponent={
                <SearchCardComponent event={event} eventId={event.id} />
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllEventsPage;
