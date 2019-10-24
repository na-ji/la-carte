import { handleActions } from 'redux-actions';
import { VIEW_CONFIG } from './action-types';

const initialState = {
  centerLatitude: 48.83959,
  centerLongitude: 2.717067,
  zoom: 16,
  bounds: {
    southWestLatitude: 48.82379,
    southWestLongitude: 2.69057,
    northEastLatitude: 48.84884,
    northEastLongitude: 2.75057
  }
};

export default handleActions(
  {
    [VIEW_CONFIG.SET]: (state, action) => ({
      ...state,
      ...action.payload
    })
  },
  initialState
);
