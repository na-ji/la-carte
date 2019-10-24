import { combineReducers } from 'redux';

import viewConfig from './view-config/reducers';
import map from './map/reducers';

export default combineReducers({ viewConfig, map });
