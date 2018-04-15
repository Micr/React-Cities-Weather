import fetch from 'cross-fetch';

const API_KEY = '66589682ec1a3f1becdd8f37433454fc';

export const GET_LOCATION = 'wtr/locations/GET_LOCATION';
export const GET_LOCATION_SUCCESS = 'wtr/locations/GET_LOCATION_SUCCESS';
export const GET_LOCATION_FAILURE = 'wtr/locations/GET_LOCATION_FAILURE';
export const REMOVE_LOCATION = 'wtr/locations/REMOVE_LOCATION';
export const SORT_LOCATIONS = 'wtr/locations/SORT_LOCATIONS';

export const requestLocation = () => ({ type: GET_LOCATION });
export const receiveLocation = location => ({ type: GET_LOCATION_SUCCESS, location });
export const receiveLocationFail = error => ({ type: GET_LOCATION_FAILURE, error });
export const removeLocation = id => ({ type: REMOVE_LOCATION, id });
export const sortLocations = order => ({ type: SORT_LOCATIONS, order });

const cityExists = ({ locations }, city) =>
  locations.find(location => location.name.toLowerCase() === city.toLowerCase());

export const fetchLocation = city => (dispatch, getState) => {
  if (cityExists(getState().locations, city)) return;
  dispatch(requestLocation());
  return fetch(
    `http://api.openweathermap.org/data/2.5/` +
    `weather?q=${encodeURIComponent(city)}&APPID=${API_KEY}`
  ).then(
    res => res.json(),
    error => dispatch(receiveLocationFail(error))
  )
    .then(response => {
      if (response.cod === 200) {
        dispatch(receiveLocation(response));
      } else {
        dispatch(receiveLocationFail(response.message));
      }
    })
};
