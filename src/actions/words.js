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
const submitAnswerRequest = () => ({
  type: 'SUBMIT_ANSWER_REQUEST'
});
const submitAnswerSuccess = () => ({
  type: 'SUBMIT_ANSWER_SUCCESS'
});
const submitAnswerError = err => ({
  type: 'SUBMIT_ANSWER_ERROR',
  err
});
const fetchProgressRequest = () => ({
  type: 'FETCH_PROGRESS_REQUEST'
});
const fetchProgressSuccess = (countCompleted, countTotal) => ({
  type: 'FETCH_PROGRESS_SUCCESS',
  countCompleted,
  countTotal
});
const fetchProgressError = err => ({
  type: 'FETCH_PROGRESS_ERROR',
  err
});

export const fetchWord = () => (dispatch, getState) => {
  dispatch(fetchWordRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/word`, {
    method: 'GET',
    headers: {Authorization: `Bearer ${authToken}`}
  }).then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(word => dispatch(fetchWordSuccess(word.word, word.translation, word.m)))
    .catch(err => dispatch(fetchWordError(err)));
};
export const submitAnswer = m => (dispatch, getState) => {
  dispatch(submitAnswerRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/word`, {
    method: 'PUT',
    headers: {Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({m})
  }).then(res => normalizeResponseErrors(res))
    .then(() => dispatch(submitAnswerSuccess()))
    .catch(err => dispatch(submitAnswerError(err)));
};
export const fetchProgress = () => (dispatch, getState) => {
  dispatch(fetchProgressRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/word/progress`, {
    method: 'GET',
    headers: {Authorization: `Bearer ${authToken}`}
  }).then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(progress => dispatch(fetchProgressSuccess(progress.countCompleted, progress.countTotal)))
    .catch(err => dispatch(fetchProgressError(err)));
};
