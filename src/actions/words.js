import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

const fetchWordRequest = () => ({
  type: 'FETCH_WORD_REQUEST'
});
const fetchWordSuccess = (word, translation) => ({
  type: 'FETCH_WORD_SUCCESS',
  word,
  translation
});
const fetchWordError = err => ({
  type: 'FETCH_WORD_ERROR',
  err
});

export const fetchWord = () => dispatch => {
  dispatch(fetchWordRequest());
  return fetch(`${API_BASE_URL}/word`)
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(word => dispatch(fetchWordSuccess(word.word, word.translation)))
    .catch(err => dispatch(fetchWordError(err)));
};
