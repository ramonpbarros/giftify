import { csrfFetch } from './csrf';

const LOAD_EVENTS = 'events/LOAD_EVENTS';
const LOAD_EVENT = 'events/LOAD_EVENT';
const LOAD_EVENTS_CURRENT_USER = 'events/LOAD_EVENTS_CURRENT_USER';
const CREATE_EVENT = 'events/CREATE_EVENT';
const UPDATE_EVENT = 'events/UPDATE_EVENT';
const CLEAR_EVENTS = 'events/CLEAR_EVENTS';
const DELETE_EVENT = 'events/DELETE_EVENT';

const loadEvents = (payload) => ({
  type: LOAD_EVENTS,
  payload,
});

const loadEvent = (payload) => ({
  type: LOAD_EVENT,
  payload,
});

const loadEventsCurrentUser = (events) => ({
  type: LOAD_EVENTS_CURRENT_USER,
  events,
});

const createEvent = (event) => ({
  type: CREATE_EVENT,
  event,
});

const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  event,
});

export const clearEvents = () => ({
  type: CLEAR_EVENTS,
});

const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  eventId,
});

export const getAllEvents = () => async (dispatch) => {
  const response = await csrfFetch('/api/events');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadEvents(data));
    return data;
  }
  return response;
};

export const getEventsByCurrentUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/events/current');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadEventsCurrentUser(data));
    return data;
  }
  return response;
};

export const createNewEvent =
  ({
    eventName,
    eventDescription,
    eventDate,
    imgUrl,
    maxAttendees,
    maxGiftCost,
  }) =>
  async (dispatch) => {
    const response = await csrfFetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({
        eventName,
        eventDescription,
        eventDate,
        imgUrl,
        maxAttendees,
        maxGiftCost,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('data: ', data)
      dispatch(createEvent(data));
      return data;
    }
  };

export const getEventById = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadEvent(data));
    return data;
  }
  return response;
};

export const editEvent =
  (
    {
      eventName,
      eventDate,
      eventDescription,
      maxGiftCost,
      maxAttendees,
      imgUrl,
    },
    eventId
  ) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify({
        eventName,
        eventDate,
        eventDescription,
        maxGiftCost,
        maxAttendees,
        imgUrl,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateEvent(data));
      return data;
    }
  };

export const removeEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: 'DELETE',
  });

  const itemData = await response.json();
  if (response.ok) {
    dispatch(deleteEvent(eventId));
    return itemData;
  }
};

function eventReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_EVENTS:
      action.payload.Events.forEach((event) => {
        newState[event.id] = event;
      });
      return newState;
    case LOAD_EVENTS_CURRENT_USER:
      action.events.Events.forEach((event) => {
        newState[event.id] = event;
      });
      return newState;
    case LOAD_EVENT:
      newState[action.payload.id] = action.payload;
      return newState;
    case CREATE_EVENT:
      newState[action.event.id] = {
        ...newState[action.event.id],
        ...action.event,
      };
      return newState;
    case UPDATE_EVENT:
      newState[action.event.id] = {
        ...newState[action.event.id],
        ...action.event,
      };
      return newState;
    case CLEAR_EVENTS:
      return {};
    case DELETE_EVENT:
      delete newState[action.eventId];
      return newState;
    default:
      return state;
  }
}

export default eventReducer;
