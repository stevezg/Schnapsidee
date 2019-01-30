const initialState = {currentWord: null, currentTranslation: null, currentM: 1, loading:false, err: null};

export default (state=initialState, action) => {
  switch (action.type) {
    case 'FETCH_WORD_REQUEST':
      return {...state, loading: true};
    case 'FETCH_WORD_SUCCESS':
      return {...state, currentWord: action.word, currentTranslation: action.translation, currentM: action.m, loading: false};
    case 'FETCH_WORD_ERROR':
      return {...state, err: action.err, loading: false};
    case 'SUBMIT_ANSWER_REQUEST':
      return {...state, loading: true};
    case 'SUBMIT_ANSWER_SUCCESS':
      return {...state, loading: false};
    case 'SUBMIT_ANSWER_ERROR':
      return {...state, loading: false, err: action.err};
    default:
      return state;
  }
}
