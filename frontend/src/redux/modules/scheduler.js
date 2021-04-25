import get from 'lodash/get';
import { GET_SCHEDULER_DATA } from 'apollo/queries';

const SET_SCHEDULER = 'SET_SCHEDULER';

const initialState = {
  data: null
};

export function schedulerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SCHEDULER:
      return {
        ...state,
        data: action.payload
          .map(item => ({
            ...item,
            startDate: new Date(item.startDate),
            endDate: new Date(item.endDate)
          }))
      };

    case 'SCHEDULER_CLEAR':
      return initialState;

    default:
      return state;
  }
}

export const clearScheduler = () => ({
  type: 'SCHEDULER_CLEAR'
});

export function getSchedulerData({ startDate, endDate }) {
  return async (dispatch, getState, { client }) => {
    await client.query({
      query: GET_SCHEDULER_DATA,
      variables: { startDate, endDate }
    })
      .then(({ data: { getSchedulerData } }) => {
        dispatch({
          type: SET_SCHEDULER,
          payload: get(getSchedulerData, 'result', [])
        });
      })
      .catch(er => {
        console.log(er);
      });
  };
}
