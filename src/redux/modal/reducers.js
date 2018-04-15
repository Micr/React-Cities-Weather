import { HIDE_MODAL } from './actions';
import { GET_LOCATION_FAILURE } from '../locations/actions';

const initialState = {
  error: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_LOCATION_FAILURE:
      return {
        error: action.error
      };
    case HIDE_MODAL:
      return {
        error: ''
      };
    default:
      return state;
  }
}
