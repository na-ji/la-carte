import { put, select, takeLatest, call } from '@redux-saga/core/effects';

import { MAP } from './action-types';
import { initApolloClient } from '../../apollo';
import { RAW_DATA_QUERY } from '../../queries';
import { VIEW_CONFIG } from '../view-config/action-types';

const apolloClient = initApolloClient();

const rawDataQueryVars = coords => ({
  pokemonArgs: {
    ...coords
  },
  pokestopArgs: {
    ...coords
  }
});

function* fetchData({ payload }) {
  const { bounds } = payload;
  const { data } = yield call(apolloClient.query, {
    query: RAW_DATA_QUERY,
    variables: rawDataQueryVars(bounds)
  });
  yield put({ type: MAP.SET_DATA, payload: data });
}

function* watchFetchData() {
  yield takeLatest(VIEW_CONFIG.SET, fetchData);
}

export default call(watchFetchData);
