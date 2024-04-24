import { csrfFetch } from './csrf';

const LOAD_EVENTS = 'events/LOAD_EVENTS';
const LOAD_EVENT = 'events/LOAD_EVENT';
const LOAD_EVENTS_CURRENT_USER = 'events/LOAD_EVENTS_CURRENT_USER';
const CREATE_EVENT = 'events/CREATE_EVENT';
const UPDATE_EVENT = 'events/UPDATE_EVENT';
const DELETE_EVENT = 'events/DELETE_EVENT';

const loadEvents = (eventList) => ({
  type: LOAD_EVENTS,
  payload: eventList,
});

const loadEvent = (event) => ({
  type: LOAD_EVENT,
  payload: event,
});

const loadEventsCurrentUser = (events) => ({
  type: LOAD_EVENTS_CURRENT_USER,
  payload: events,
});

const createEvent = (event) => ({
  type: CREATE_EVENT,
  payload: event,
});

const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  payload: event,
});

const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  payload: eventId,
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
  ({ eventName, eventDescription, eventDate }) =>
  async (dispatch) => {
    const response = await csrfFetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({
        eventName,
        eventDescription,
        eventDate,
      }),
    });

    if (response.ok) {
      const event = await response.json();
      dispatch(createEvent(event));
      return event;
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

  if (response.ok) {
    dispatch(deleteEvent(response));
    return response;
  }
};

const initialState = {
  eventsList: [],
  eventsCurr: [],
  newEvent: {},
  eventDetails: {},
  updatedSpot: {},
  deletedEventId: null,
};

let deletedEventId;

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EVENTS:
      return {
        ...state,
        eventsList: action.payload,
      };
    case LOAD_EVENT:
      return {
        ...state,
        eventDetails: {
          [action.payload.id]: action.payload,
        },
      };
    case CREATE_EVENT:
      return {
        ...state,
        newEvent: {
          [action.payload.id]: action.payload,
        },
      };
    case LOAD_EVENTS_CURRENT_USER:
      return {
        ...state,
        eventsCurr: action.payload,
      };
    case UPDATE_EVENT:
      return {
        ...state,
        updatedEvent: {
          [action.payload.id]: action.payload,
        },
      };
    case DELETE_EVENT:
      deletedEventId = action.payload;
      return {
        ...state,
        events: Array.isArray(state.spots)
          ? state.events.filter((event) => event.id !== deletedEventId)
          : state.events,
      };
    default:
      return state;
  }
};

export default eventsReducer;
