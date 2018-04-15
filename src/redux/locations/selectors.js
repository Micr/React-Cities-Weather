import { createSelector } from 'reselect'

const getLocations = ({ locations }) => locations;
const getSortOrder = ({ sortOrder }) => sortOrder;

export const getAdjustedLocations = createSelector(
  getLocations,
  locations => locations.map(location => ({
    ...location,
    temp_celcius: location.main.temp - 273.15,
    pressure_mmhg: (location.main.pressure * 0.7500616827).toFixed(1)
  }))
);

export const getSortedLocations = createSelector(
  [getAdjustedLocations, getSortOrder],
  (locations, order) => {
    if (order === 0) return locations;
    return locations.sort((a, b) => {
      if (a.name > b.name) {
        return order;
      }
      if (b.name > a.name) {
        return -1 * order;
      }
      return 0;
    });
  }
)
