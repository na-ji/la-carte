import { all } from 'redux-saga/effects';
import 'isomorphic-unfetch';

import mapSagas from './map/sagas';

function* rootSaga() {
  yield all([mapSagas]);
}

export default rootSaga;
