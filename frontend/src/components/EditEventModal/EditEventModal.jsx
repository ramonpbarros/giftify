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
  const [maxAttendees, setMaxAttendees] = useState(event.maxAttendees || 2);
  const [maxGiftCost, setMaxGiftCost] = useState(event.maxGiftCost || 10);
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
              placeholder={eventName}
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              placeholder="Event Description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows={4}
              style={{ resize: 'none', overflowY: 'auto' }}
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
              placeholder={2}
              type="number"
              value={maxAttendees}
              onChange={(e) => setMaxAttendees(e.target.value)}
              min={0}
            />
          </label>
          <label>
            Max Gift Cost
            <input
              placeholder={`$ ${10}`}
              type="number"
              value={maxGiftCost}
              onChange={(e) => setMaxGiftCost(e.target.value)}
              min={0}
            />
          </label>
          {Object.keys(errors).length > 0 && (
            <>
              <small className="error">{errors.maxGiftCost}</small>
              <small className="error">{errors.maxAttendees}</small>
            </>
          )}
          <button className="btn btn-content" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
