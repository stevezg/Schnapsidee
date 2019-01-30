import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

const fetchWordRequest = () => ({
  type: 'FETCH_WORD_REQUEST'
});
const fetchWordSuccess = (word, translation, m) => ({
  type: 'FETCH_WORD_SUCCESS',
  word,
  translation,
  m
});
const fetchWordError = err => ({
  type: 'FETCH_WORD_ERROR',
  err
});

export const fetchWord = () => (dispatch, getState) => {
  dispatch(fetchWordRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/word`, {
    method: 'GET',
    headers: {Authorization: `Bearer ${authToken}`}
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(word => dispatch(fetchWordSuccess(word.word, word.translation, word.m)))
    .catch(err => dispatch(fetchWordError(err)));
};
