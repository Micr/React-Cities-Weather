import {
  GET_LOCATION,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
  REMOVE_LOCATION,
  SORT_LOCATIONS
} from './actions';

const initialState = {
  locations: [],
  isFetching: false,
  sortOrder: 0
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_LOCATION:
      return {
        ...state,
        isFetching: true
      };
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        locations: [
          ...state.locations,
          action.location,
        ],
        isFetching: false
      };
    case GET_LOCATION_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case REMOVE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(location => location.id !== action.id)
      }
    case SORT_LOCATIONS:
      return {
        ...state,
        sortOrder: (state.sortOrder || 1) * -1,
      }
    default:
      return state;
  }
};
