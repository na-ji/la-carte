import { createAction } from 'redux-actions';

import { VIEW_CONFIG } from './action-types';

export const setViewConfig = createAction(VIEW_CONFIG.SET);
