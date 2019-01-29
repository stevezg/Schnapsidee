const initialState = {currentWord: null, currentTranslation: null, loading:false, err: null};

export default (state=initialState, action) => {
  switch (action.type) {
    case 'FETCH_WORD_REQUEST':
      return {...state, loading: true};
    case 'FETCH_WORD_SUCCESS':
      return {...state, currentWord: action.word, currentTranslation: action.translation, loading: false};
    case 'FETCH_WORD_ERROR':
      return {...state, err: action.err, loading: false};
    default:
      return state;
  }
}
