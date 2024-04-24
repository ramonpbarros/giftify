import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editEvent } from '../../store/events';
import { useModal } from '../../context/Modal';
import './EditEventModal.css';

export default function EditEventModal({ event }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [eventName, setEventName] = useState(event.eventName || '');
  const [eventDescription, setEventDescription] = useState(
    event.eventDescription || ''
  );
  // const [eventDate, setEventDate] = useState(event.eventDate || '');
  const [eventDate, setEventDate] = useState(
    event.eventDate || new Date().toISOString().substr(0, 10)
  );

  const [imgUrl, setImgUrl] = useState(event.imgUrl || '');
  const [maxAttendees, setMaxAttendees] = useState(event.maxAttendees || '');
  const [maxGiftCost, setMaxGiftCost] = useState(event.maxGiftCost || '');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editEvent(
        {
          eventName,
          eventDescription,
          eventDate,
          imgUrl,
          maxAttendees,
          maxGiftCost,
        },
        event.id
      )
    )
      .then(() => {
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <div className="edit-event-container">
        <h3>Edit Event</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              placeholder="Event Name"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </label>
          <label>
            Description
            <input
              placeholder="Event Description"
              type="text"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </label>
          <label>
            Date
            <input
              placeholder="Event Date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </label>
          <label>
            Image Url
            <input
              placeholder="Image Link"
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </label>
          <label>
            Max Attendees
            <input
              placeholder="Max Attendees"
              type="number"
              value={maxAttendees}
              onChange={(e) => setMaxAttendees(e.target.value)}
            />
          </label>
          <label>
            Max Gift Cost
            <input
              placeholder="Max Gift Cost"
              type="number"
              value={maxGiftCost}
              onChange={(e) => setMaxGiftCost(e.target.value)}
            />
          </label>
          <button className="btn btn-content" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
