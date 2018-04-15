import { combineReducers } from 'redux'
import locations from './locations/reducers'
import modal from './modal/reducers'
 
export default combineReducers({
  locations,
  modal
});
