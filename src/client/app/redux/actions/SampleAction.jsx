import types from './ActionTypes';

export function receiveSample(json) {
  console.log(':receive sample');
  return { type: types.RECEIVE_SAMPLE, sample: json.sample };
}
export function fetchSample() {
  return (dispatch) => {
    dispatch(receiveSample({ sample: 'Sample test' }));
  };
}
