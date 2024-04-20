import { csrfFetch } from './csrf';

const LOAD_EVENTS = 'events/LOAD_EVENTS';
const LOAD_EVENTS_CURRENT_USER = 'events/LOAD_EVENTS_CURRENT_USER';

const loadEvents = (eventList) => ({
  type: LOAD_EVENTS,
  payload: eventList,
});

const loadEventsCurrentUser = (events) => ({
  type: LOAD_EVENTS_CURRENT_USER,
  payload: events,
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

const initialState = {
  eventsList: [],
  eventsCurr: []
};

export const getEventsByCurrentUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/events/current');
  console.log(response)

  if (response.ok) {
    const data = await response.json();
    dispatch(loadEventsCurrentUser(data));
    return data;
  }
  return response;
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EVENTS:
      return {
        ...state,
        eventsList: action.payload,
      };
    case LOAD_EVENTS_CURRENT_USER:
      return {
        ...state,
        eventsCurr: action.payload,
      };
    default:
      return state;
  }
};

export default eventsReducer;