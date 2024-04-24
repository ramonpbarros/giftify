import { csrfFetch } from './csrf';

const LOAD_ATTENDEES = 'attendee/LOAD_ATTENDEES';
const REQUEST_ATTENDANCE = 'attendee/REQUEST_ATTENDANCE';
const DELETE_ATTENDEE = 'attendee/DELETE_ATTENDEE';

const loadAttendees = (attendeeList) => ({
  type: LOAD_ATTENDEES,
  payload: attendeeList,
});

const requestAttendance = (attendance) => ({
  type: REQUEST_ATTENDANCE,
  payload: attendance,
});

const deleteAttendee = (attendeeId) => ({
  type: DELETE_ATTENDEE,
  payload: attendeeId,
});

export const getAllAttendeesEventById = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/attendees`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadAttendees(data));
    return data;
  }
  return response;
};

export const newRequestAttendance = (eventId) => async (dispatch) => {
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

  if (response.ok) {
    return dispatch(deleteAttendee(response));
  }
};

const initialState = {
  attendees: [],
  status: {}
};

const attendeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ATTENDEES:
      return {
        ...state,
        attendee: {
          [action.payload.id]: action.payload,
        },
      };
    case REQUEST_ATTENDANCE:
      return {
        ...state,
        status: {
          [action.payload.id]: action.payload,
        },
      };
    case DELETE_ATTENDEE:
      return {
        ...state,
        attendees: state.attendees.filter(
          (attendee) => attendee.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default attendeesReducer;
