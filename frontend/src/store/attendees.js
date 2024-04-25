import { csrfFetch } from './csrf';

const LOAD_ATTENDEES = 'attendee/LOAD_ATTENDEES';
const REQUEST_ATTENDANCE = 'attendee/REQUEST_ATTENDANCE';
const CLEAR_ATTENDEES = 'attendee/CLEAR_ATTENDEES';
const DELETE_ATTENDEE = 'attendee/DELETE_ATTENDEE';

const loadAttendees = (payload) => ({
  type: LOAD_ATTENDEES,
  payload,
});

const requestAttendance = (attendance) => ({
  type: REQUEST_ATTENDANCE,
  attendance,
});

export const clearAttendees = () => ({
  type: CLEAR_ATTENDEES,
});

const deleteAttendee = (eventId, userId) => ({
  type: DELETE_ATTENDEE,
  eventId,
  userId,
});

export const getAllAttendeesByEventId = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/attendees`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadAttendees(data));
    return data;
  }
  return response;
};

export const requestNewAttendance = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/attendees`);

  if (response.ok) {
    const data = await response.json();
    dispatch(requestAttendance(data));
    return data;
  }
  return response;
};

export const removeAttendace = (eventId, userId) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/events/${eventId}/attendance/${userId}`,
    {
      method: 'DELETE',
    }
  );

  const itemData = await response.json();
  if (response.ok) {
    dispatch(deleteAttendee(eventId, userId));
    return itemData;
  }
};

function attendeesReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_ATTENDEES:
      action.payload.Attendees.forEach((event) => {
        newState[event.id] = event;
      });
      return newState;
    case REQUEST_ATTENDANCE:
      newState[action.event.id] = {
        ...newState[action.event.id],
        ...action.event,
      };
      return newState;
    case CLEAR_ATTENDEES:
      return {};
    case DELETE_ATTENDEE:
      delete newState[action.eventId];
      return newState;
    default:
      return state;
  }
}

export default attendeesReducer;
